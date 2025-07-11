import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_HISTORICO = '@historico_pesquisas';

export async function adicionarAoHistorico(palavra, idioma) {
  try {
    const novoItem = { palavra, idioma, data: new Date().toISOString() };
    const historicoAtual = await obterHistorico();
    const novoHistorico = [novoItem, ...historicoAtual];

    await AsyncStorage.setItem(CHAVE_HISTORICO, JSON.stringify(novoHistorico));
  } catch (error) {
    console.error('Erro ao adicionar ao histórico:', error);
  }
}

export async function obterHistorico() {
  try {
    const json = await AsyncStorage.getItem(CHAVE_HISTORICO);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Erro ao obter histórico:', error);
    return [];
  }
}

export async function limparHistorico() {
  try {
    await AsyncStorage.removeItem(CHAVE_HISTORICO);
  } catch (error) {
    console.error('Erro ao limpar histórico:', error);
  }
}
