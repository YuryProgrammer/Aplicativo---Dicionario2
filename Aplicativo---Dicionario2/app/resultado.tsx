import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { buscarPalavra } from '../services/api';
import { adicionarAoHistorico } from '../services/historico';

interface Resultado {
  significado: string;
  sinonimo: string;
  frase: string;
}

export default function Resultado() {
  const router = useRouter();
  const { palavra } = useLocalSearchParams();

  const [dados, setDados] = useState<Resultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      if (typeof palavra !== 'string' || palavra.trim() === '') {
        setErro('Palavra inválida.');
        return;
      }

      try {
        const resultado = await buscarPalavra(palavra);
        setDados(resultado);

        await adicionarAoHistorico(palavra.trim(), 'pt-BR');
      } catch (err) {
        setErro('Erro ao buscar dados');
      }
    }

    carregarDados();
  }, [palavra]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.voltarBtn}>
        <Image source={require('../assets/Voltar.png')} style={styles.voltarImg} />
      </TouchableOpacity>

      <View style={styles.barraPalavra}>
        <Text style={styles.palavra}>{palavra}</Text>
      </View>

      {erro ? (
        <Text style={{ color: 'red' }}>{erro}</Text>
      ) : dados ? (
        <>
          <Text style={styles.label}>SIGNIFICADO:</Text>
          <View style={styles.caixa}>
            <Text>{dados.significado}</Text>
          </View>

          <Text style={styles.label}>SINÔNIMO:</Text>
          <View style={styles.caixa}>
            <Text>{dados.sinonimo}</Text>
          </View>

          <Text style={styles.label}>APLICAÇÃO EM FRASE:</Text>
          <View style={styles.caixa}>
            <Text>{dados.frase}</Text>
          </View>
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dce6ea',
    padding: 20,
    flexGrow: 1,
  },
  voltarBtn: {
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
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
  },
  palavra: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 12,
  },
  caixa: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    minHeight: 60,
  },
});
