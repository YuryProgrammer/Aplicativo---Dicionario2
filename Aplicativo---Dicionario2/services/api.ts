const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries';
const BASE_URL_PT = 'https://significado.herokuapp.com/v2'; // Dicionário Aberto
const BASE_URL_SINONIMOS = 'https://api.dicionario-aberto.net/entry'; // ainda não utilizado

const idiomasSuportados = ['en', 'es', 'fr', 'de', 'it']; // Idiomas que a DictionaryAPI suporta

export async function buscarPalavra(palavra: string, idioma: string = 'en') {
  try {
    if (idioma === 'pt-BR') {
      const response = await fetch(`${BASE_URL_PT}/${palavra}`);

      if (!response.ok) throw new Error(`Erro: ${response.status}`);

      const data = await response.json();

      const significado = data[0]?.meanings?.join('\n') || 'Sem definição encontrada.';
      const sinonimo = 'Sinônimos não disponíveis para português.';
      const frase = 'Exemplo de frase não disponível para português.';

      return { significado, sinonimo, frase };
    }

    if (!idiomasSuportados.includes(idioma)) {
      throw new Error(`Idioma "${idioma}" ainda não é suportado pela API.`);
    }

    const response = await fetch(`${BASE_URL}/${idioma}/${palavra}`);

    if (!response.ok) {
      const text = await response.text();
      console.warn('Resposta inesperada:', text);
      throw new Error('Erro ao buscar na API');
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Nenhum resultado encontrado');
    }

    const entry = data[0];
    const meanings = entry.meanings || [];
    const significado = meanings[0]?.definitions[0]?.definition || 'Sem definição encontrada.';
    const sinonimo = meanings[0]?.synonyms?.slice(0, 5).join(', ') || 'Sem sinônimos disponíveis.';
    const frase = meanings[0]?.definitions[0]?.example || 'Sem exemplo disponível.';

    return { significado, sinonimo, frase };
  } catch (error) {
    console.error('Erro ao buscar palavra:', error);
    throw error;
  }
}
