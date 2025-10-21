const { GoogleGenAI } = require('@google/genai');
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });
const model = 'gemini-2.5-flash';

async function geradorPlano(inputs) {
    const { tema, serie_ano, componente_curricular, duracao } = inputs;
    

    const prompt = `
Você é um assistente de IA focado em educação e especializado em gerar planos de aula. Sua resposta DEVE ser estritamente em formato JSON.

Gere um plano de aula completo com base nas seguintes informações:
- Tema: ${tema}
- Série/Ano: ${serie_ano}
- Componente Curricular: ${componente_curricular}
- Duração: ${duracao}

O JSON DEVE conter as chaves: 'introducao_ludica', 'objetivo_bncc', 'passo_a_passo' (que deve ser um array de objetos) e 'rubrica_avaliacao' (que deve ser um array de objetos).

Note que é essencial que o JSON esteja bem formatado e válido. Siga rigorosamente a estrutura abaixo:

1. Introdução Lúdica: Crie uma forma engajadora de apresentar o tema.
2. Objetivo BNCC: Crie um objetivo realista e formatado como um código da BNCC e sua descrição (Ex: EF03CI04 - Identificar...).
3. Passo a Passo: Divida a aula em 3 a 4 etapas (ex: Aquecimento, Desenvolvimento, Conclusão). Inclua o campo 'etapa' e 'descricao' em cada item.
4. Rubrica de Avaliação: Crie 2 critérios de avaliação com nível alto e nível baixo. Inclua os campos 'criterio', 'nivel_alto' e 'nivel_baixo' em cada item.

Responda APENAS com o objeto JSON.`;

    try {
        const response = await ai.models.generateContent({ model: model, contents: prompt });
        const jsonString = response.text.trim();
        let cleanedJsonString = jsonString.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        const planoPronto = JSON.parse(cleanedJsonString);
        
        if (!planoPronto.introducao_ludica) { throw new Error("Erro no JSON"); }

        return planoPronto;
    } catch (error) {
        console.error('Erro na Geração da IA:', error);
        throw new Error('Falha ao gerar o plano de aula pela IA ou processar o JSON.');
    }
}

module.exports = {geradorPlano};