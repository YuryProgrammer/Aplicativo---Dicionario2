import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';

interface PalavraHistorico {
  palavra: string;
  idioma: string;
}

export default function Historico() {
  const [historico, setHistorico] = useState<PalavraHistorico[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      async function carregarHistorico() {
        const historicoStr = await AsyncStorage.getItem('historico');
        const historicoDados = historicoStr ? JSON.parse(historicoStr) : [];
        setHistorico([...historicoDados].reverse());
      }

      carregarHistorico();
    }, [])
  );

  const handleSelecionarPalavra = (palavra: string, idioma: string) => {
    router.push({
      pathname: '/resultado',
      params: { palavra, idioma },
    });
  };

  const limparHistorico = () => {
    Alert.alert(
      'Limpar Histórico',
      'Tem certeza de que deseja apagar todo o histórico?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await AsyncStorage.removeItem('historico');
            setHistorico([]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.voltarBtn}>
          <Image source={require('../assets/Voltar.png')} style={styles.voltarImg} />
        </TouchableOpacity>
        <Text style={styles.titulo}>Histórico de Pesquisas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          {historico.length === 0 ? (
            <Text style={styles.vazio}>Nenhuma pesquisa realizada ainda.</Text>
          ) : (
            historico.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => handleSelecionarPalavra(item.palavra, item.idioma)}
              >
                <Text style={styles.palavra}>{item.palavra}</Text>
                <Text style={styles.idioma}>Idioma: {item.idioma}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {historico.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.botaoLimpar} onPress={limparHistorico}>
            <Text style={styles.textoBotaoLimpar}>🗑 Limpar Histórico</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#dce6ea',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  voltarBtn: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  voltarImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
  },
  container: {
    backgroundColor: '#dce6ea',
    paddingHorizontal: 20,
    paddingBottom: 100, // espaço para o botão fixo
    flexGrow: 1,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  vazio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  palavra: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  idioma: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  botaoLimpar: {
    backgroundColor: '#ff4444',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  textoBotaoLimpar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
