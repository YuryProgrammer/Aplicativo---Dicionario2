import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const [palavra, setPalavra] = useState('');
  const [idioma, setIdioma] = useState('en');
  const router = useRouter();

  const handleBuscar = async () => {
    if (palavra.trim() === '') {
      Alert.alert('Campo vazio', 'Por favor, digite uma palavra.');
      return;
    }

    if (idioma !== 'en' && idioma !== 'pt-BR') {
      Alert.alert(
        'Idioma não suportado',
        'Este idioma ainda não é suportado pela API. Por favor, selecione outro.'
      );
      return;
    }

    try {
      const novaEntrada = { palavra: palavra.trim(), idioma };

      const historicoStr = await AsyncStorage.getItem('historico');
      const historico = historicoStr ? JSON.parse(historicoStr) : [];

      const novoHistorico = [novaEntrada, ...historico];

      await AsyncStorage.setItem('historico', JSON.stringify(novoHistorico));
    } catch (error) {
      console.error('Erro ao salvar no histórico:', error);
      Alert.alert('Erro', 'Não foi possível salvar no histórico.');
    }

    router.push({
      pathname: '/resultado',
      params: {
        palavra: palavra.trim(),
        idioma,
      },
    });

    setPalavra('');
  };

  const irParaHistorico = () => {
    router.push('/historico');
  };

  const irParaFavoritos = () => {
    router.push('/favoritos');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.titulo}>Meu Amigo Dici</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Escolha o idioma:</Text>
        <Picker
          selectedValue={idioma}
          onValueChange={(itemValue) => {
            setIdioma(itemValue);
            if (itemValue !== 'en' && itemValue !== 'pt-BR') {
              Alert.alert(
                'Idioma não suportado',
                'Este idioma ainda não é suportado pela API. Usaremos o inglês como padrão.'
              );
            }
          }}
          style={styles.picker}
        >
          <Picker.Item label="Inglês" value="en" />
          <Picker.Item label="Português (Brasil)" value="pt-BR" />
          <Picker.Item label="Espanhol" value="es" />
          <Picker.Item label="Francês" value="fr" />
          <Picker.Item label="Alemão" value="de" />
          <Picker.Item label="Italiano" value="it" />
          <Picker.Item label="Japonês" value="ja" />
          <Picker.Item label="Coreano" value="ko" />
          <Picker.Item label="Hindi" value="hi" />
          <Picker.Item label="Árabe" value="ar" />
          <Picker.Item label="Turco" value="tr" />
          <Picker.Item label="Russo" value="ru" />
        </Picker>
      </View>

      <TextInput
        placeholder="Digite uma palavra"
        style={styles.input}
        value={palavra}
        onChangeText={setPalavra}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.botao} onPress={handleBuscar}>
        <View style={styles.botaoConteudo}>
          <Text style={styles.textoBotao}>Buscar</Text>
          <Image source={require('../assets/Lupa.png')} style={styles.iconeBotao} />
        </View>
      </TouchableOpacity>

      <View style={styles.cabecalho}>
        <TouchableOpacity style={styles.botaoCabecalho} onPress={irParaHistorico}>
          <Image source={require('../assets/Historico.png')} style={styles.iconeCabecalho} />
          <Text style={styles.textoCabecalho}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCabecalho} onPress={irParaFavoritos}>
          <Image source={require('../assets/Coracao.png')} style={styles.iconeCabecalho} />
          <Text style={styles.textoCabecalho}>Favoritos</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 10,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '500',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    marginBottom: 24,
  },
  botaoConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  iconeBotao: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: '100%',
  },
  botaoCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  textoCabecalho: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginLeft: 6,
  },
  iconeCabecalho: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
