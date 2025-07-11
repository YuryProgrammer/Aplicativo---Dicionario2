// app/historico.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { obterHistorico, limparHistorico } from '../services/historico';

export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const router = useRouter();

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const lista = await obterHistorico();
    setHistorico(lista);
  };

  const handleLimpar = async () => {
    Alert.alert('Confirmação', 'Deseja apagar todo o histórico?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar',
        style: 'destructive',
        onPress: async () => {
          await limparHistorico();
          setHistorico([]);
        },
      },
    ]);
  };

  type HistoricoItem = {
  palavra: string;
  idioma: string;
  data: string;
};

const renderItem = ({ item }: { item: HistoricoItem }) => (

    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        router.push({
          pathname: '/resultado',
          params: {
            palavra: item.palavra,
            idioma: item.idioma,
          },
        })
      }
    >
      <Text style={styles.palavra}>{item.palavra}</Text>
      <Text style={styles.idioma}>Idioma: {item.idioma}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.voltarBtn}>
        <Image source={require('../assets/Voltar.png')} style={styles.voltarImg} />
      </TouchableOpacity>

      <Text style={styles.titulo}>Histórico de Pesquisas</Text>

      {historico.length === 0 ? (
        <Text>Nenhuma pesquisa encontrada.</Text>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 10 }}
        />
      )}

      {historico.length > 0 && (
        <TouchableOpacity style={styles.limparBtn} onPress={handleLimpar}>
          <Text style={styles.limparText}>Limpar Histórico</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce6ea',
    padding: 20,
  },
  voltarBtn: {
    width: 32,
    height: 32,
    marginBottom: 10,
  },
  voltarImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff4cc',
    borderRadius: 10,
    padding: 12,
  },
  palavra: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  idioma: {
    fontSize: 14,
    color: '#555',
  },
  limparBtn: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#ff6961',
    borderRadius: 8,
  },
  limparText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
