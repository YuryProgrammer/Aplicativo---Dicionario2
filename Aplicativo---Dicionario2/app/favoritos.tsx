import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Loarder from '../components/loader'; // Loader personalizado

interface Favorito {
  palavra: string;
  idioma: string;
}

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<Record<string, Favorito[]>>({});
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    const todos = await AsyncStorage.getAllKeys();
    const chavesFavoritos = todos.filter((key) => key.startsWith('favorito:'));

    const itens = await AsyncStorage.multiGet(chavesFavoritos);

    const agrupados: Record<string, Favorito[]> = {};

    for (const [key, valor] of itens) {
      if (valor) {
        try {
          const { palavra, idioma }: Favorito = JSON.parse(valor);
          if (!agrupados[idioma]) agrupados[idioma] = [];
          agrupados[idioma].push({ palavra, idioma });
        } catch (e) {
          console.error('Erro ao carregar favorito', key);
        }
      }
    }

    setFavoritos(agrupados);
    setCarregando(false);
  };

  if (carregando) {
    return <Loarder />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.voltarBtn}>
          <Image
            source={require('../assets/Voltar.png')}
            style={styles.voltarImg}
          />
        </TouchableOpacity>
        <Text style={styles.titulo}>Palavras Favoritas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {Object.keys(favoritos).length === 0 ? (
          <Text style={styles.nenhum}>Nenhuma palavra favoritada.</Text>
        ) : (
          Object.entries(favoritos).map(([idioma, palavras]) => (
            <View key={idioma} style={styles.livro}>
              <Text style={styles.idioma}>{idioma}</Text>
              {palavras.map(({ palavra }) => (
                <TouchableOpacity
                  key={palavra}
                  onPress={() =>
                    router.push({
                      pathname: '/resultado',
                      params: { palavra, idioma },
                    })
                  }
                >
                  <Text style={styles.palavra}>{palavra}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
      </ScrollView>
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
    marginRight: 10,
    width: 32,
    height: 32,
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
  },
  container: {
    padding: 20,
    backgroundColor: '#dce6ea',
    flexGrow: 1,
  },
  nenhum: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
  },
  livro: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  idioma: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  palavra: {
    fontSize: 16,
    paddingVertical: 4,
    color: '#0077aa',
  },
});
