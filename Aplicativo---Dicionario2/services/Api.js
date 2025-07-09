export async function buscarPalavra(idioma, palavra) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${idioma}/${palavra}`);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return {
        significado: 'Não encontrado.',
        sinonimo: 'Não disponível.',
        frase: 'Não disponível.',
      };
    }

    const definicao = data[0]?.meanings?.[0]?.definitions?.[0];

    return {
      significado: definicao?.definition || 'Não encontrado.',
      sinonimo: (definicao?.synonyms || []).join(', ') || 'Não disponível.',
      frase: definicao?.example || 'Não disponível.',
    };
  } catch (error) {
    console.error('Erro na API:', error);
    throw new Error('Erro ao buscar a palavra.');
  }
}
