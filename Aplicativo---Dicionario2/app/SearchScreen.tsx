import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

export default function Home() {
  const [idioma, setIdioma] = useState('');
  const [palavra, setPalavra] = useState('');

  const handlePesquisar = () => {
    // Aqui você pode colocar lógica de busca, navegação, etc
    console.log(`Idioma: ${idioma} | Palavra: ${palavra}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu amigo Dici!</Text>

      <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.label}>SELECIONE O IDIOMA:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={idioma}
          onChangeText={setIdioma}
          placeholder="Ex: Português"
        />
        <Image source={require('../assets/Lupa.png')} style={styles.icon} />
      </View>

      <Text style={styles.label}>PALAVRA:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={palavra}
          onChangeText={setPalavra}
          placeholder="Digite uma palavra"
        />
        <Image source={require('../assets/Lupa.png')} style={styles.icon} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePesquisar}>
        <Text style={styles.buttonText}>PESQUISAR</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce6ea',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'serif',
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginTop: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
  },
  icon: {
    width: 20,
    height: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});