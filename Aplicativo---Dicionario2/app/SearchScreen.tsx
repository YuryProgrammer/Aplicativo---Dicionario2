import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const [palavra, setPalavra] = useState('');
  const router = useRouter();

  const handleBuscar = () => {
    if (palavra.trim() === '') {
      Alert.alert('Campo vazio', 'Por favor, digite uma palavra.');
      return;
    }

    router.push({
      pathname: '/resultado',
      params: { palavra: palavra.trim() },
    });

    setPalavra('');
  };

  const irParaHistorico = () => {
    router.push('/historico');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />

      <Text style={styles.titulo}>Meu Amigo Dici (INGLÊS)</Text>

      <TextInput
        placeholder="Digite uma palavra"
        style={styles.input}
        value={palavra}
        onChangeText={setPalavra}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.botao} onPress={handleBuscar}>
        <Text style={styles.textoBotao}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoHistorico} onPress={irParaHistorico}>
        <Text style={styles.textoHistorico}>Ver Histórico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dce6ea',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoHistorico: {
    paddingVertical: 10,
  },
  textoHistorico: {
    color: '#333',
    fontSize: 14,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 10,
  },
});
