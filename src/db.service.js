require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function salvarPlano(body, planoJson) {
    try {
        const { tema, serie_ano, componente_curricular, duracao, professor } = body;

        const duracao_minutos = parseInt(duracao);

        const dadosBanco = {
            tema: tema,
            serie_ano: serie_ano,
            componente_curricular: componente_curricular,
            duracao_minutos: duracao_minutos,
            professor: professor,
            plano: planoJson
        };

        const { data, error } = await supabase
            .from('planos_aula')
            .insert([dadosBanco])
            .select(); 

        if (error) {
            console.error('Erro ao salvar no Supabase:', error);
            throw new Error('Falha ao salvar o plano de aula no banco de dados.');
        }

        console.log("🚀 ~ salvarPlano ~ data:", data)
        console.log('Plano de aula salvo com sucesso:', data[0].id);
        return data[0];
        
    } catch (error) {
        throw new Error(`Erro: ${error.message}`);
    }
}

module.exports = {salvarPlano};
