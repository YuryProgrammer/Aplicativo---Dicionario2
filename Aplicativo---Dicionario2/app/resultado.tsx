import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { buscarPalavra } from '../services/api';
import { adicionarAoHistorico } from '../services/historico';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loarder from '../components/loader'; // ✅ Loader personalizado com base na logo

interface Resultado {
  significado: string;
  sinonimo: string;
  frase: string;
}

export default function Resultado() {
  const router = useRouter();
  const { palavra, idioma } = useLocalSearchParams();

  const [dados, setDados] = useState<Resultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [favorito, setFavorito] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const chave = `favorito:${idioma}:${palavra}`;

  useEffect(() => {
    async function carregarDados() {
      if (typeof palavra !== 'string' || palavra.trim() === '') {
        setErro('Palavra inválida.');
        setCarregando(false);
        return;
      }

      try {
        const resultado = await buscarPalavra(palavra, idioma as string);
        setDados(resultado);
        await adicionarAoHistorico(palavra.trim(), idioma as string);
        verificarFavorito();
      } catch (err) {
        setErro('Erro ao buscar dados');
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [palavra]);

  const verificarFavorito = async () => {
    const valor = await AsyncStorage.getItem(chave);
    setFavorito(!!valor);
  };

  const alternarFavorito = async () => {
    if (favorito) {
      await AsyncStorage.removeItem(chave);
      setFavorito(false);
    } else {
      await AsyncStorage.setItem(chave, JSON.stringify({ palavra, idioma }));
      setFavorito(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.voltarBtn}>
        <Image source={require('../assets/Voltar.png')} style={styles.voltarImg} />
      </TouchableOpacity>

      <View style={styles.barraPalavra}>
        <Text style={styles.palavra}>{palavra}</Text>
        <TouchableOpacity onPress={alternarFavorito}>
          <Image
            source={
              favorito
                ? require('../assets/heart-filled.png')
                : require('../assets/heart-outline.png')
            }
            style={styles.iconeFavorito}
          />
        </TouchableOpacity>
      </View>

      {carregando ? (
        <Loarder /> // 👈 Loader com base na logo
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : dados ? (
        <>
          <Text style={styles.label}>SIGNIFICADO:</Text>
          <View style={styles.caixa}>
            <Text style={styles.textoCaixa}>{dados.significado}</Text>
          </View>

          <Text style={styles.label}>SINÔNIMO:</Text>
          <View style={styles.caixa}>
            <Text style={styles.textoCaixa}>{dados.sinonimo}</Text>
          </View>

          <Text style={styles.label}>APLICAÇÃO EM FRASE:</Text>
          <View style={styles.caixa}>
            <Text style={styles.textoCaixa}>{dados.frase}</Text>
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dce6ea',
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voltarBtn: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    width: 32,
    height: 32,
  },
  voltarImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  barraPalavra: {
    backgroundColor: '#fff4cc',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    alignSelf: 'stretch',
  },
  palavra: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconeFavorito: {
    width: 24,
    height: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 16,
    fontSize: 16,
    alignSelf: 'center',
  },
  caixa: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 16,
    minHeight: 60,
    marginBottom: 10,
    width: '100%',
  },
  textoCaixa: {
    fontSize: 16,
    textAlign: 'center',
  },
  erro: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
