// services/api.ts
import axios from 'axios';

export async function buscarPalavra(palavra: string): Promise<{
  significado: string;
  sinonimo: string;
  frase: string;
}> {
  try {
    const dictRes = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`
    );

    const data = dictRes.data;

    const definicao = data[0]?.meanings?.[0]?.definitions?.[0];
    const significado = definicao?.definition || 'Não encontrado.';
    const frase = definicao?.example || 'Não disponível.';

    // Busca sinônimos na Datamuse
    const sinonimoRes = await axios.get(
      `https://api.datamuse.com/words?rel_syn=${palavra}`
    );
    const sinonimos = sinonimoRes.data.map((s: any) => s.word).join(', ') || 'Não disponível.';

    return {
      significado,
      sinonimo: sinonimos,
      frase,
    };
  } catch (error) {
    console.error('Erro ao buscar a palavra:', error);
    return {
      significado: 'Erro ao buscar a palavra.',
      sinonimo: 'Não disponível.',
      frase: 'Não disponível.',
    };
  }
}
