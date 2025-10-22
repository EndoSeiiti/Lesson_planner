require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function salvarPlano(body, planoJson) {
    try {
        const { tema, serie_ano, componente_curricular, duracao, professor } = body;
        
        const duracao_minutos = parseInt(duracao);
        
        console.log("🚀 ~ salvarPlano ~ planoJson:", planoJson)
        
        const dadosBanco = {
            tema: tema,
            serie_ano: serie_ano,
            componente_curricular: componente_curricular,
            duracao_minutos: duracao_minutos,
            professor: professor,
            objetivo: planoJson.objetivo_bncc,
            introducao_ludica: planoJson.introducao_ludica,
        };

        const { data: planos_aula_data, error } = await supabase
            .from('planos_aula')
            .insert([dadosBanco])
            .select();

        for (const passo of planoJson.passo_a_passo) {
            const dados_passo = {
                etapa: passo.etapa,
                descricao: passo.descricao,
                id_plano: planos_aula_data[0].id,
            }

            const {data: planos_passo, error} = await supabase
            .from('passo_a_passo')
            .insert([dados_passo])
            .select()
        }

        for (const rubrica of planoJson.rubrica_avaliacao){
            const dados_rubrica = {
                criterio:rubrica.criterio,
                nivel_alto:rubrica.nivel_alto,
                nivel_baixo:rubrica.nivel_baixo,
                id_plano:planos_aula_data[0].id
            }

            const{data: planos_rubrica, error} = await supabase
            .from('rubrica_avaliacao')
            .insert(dados_rubrica)
            .select()
        }

        if (error) {
            console.error('Erro ao salvar no Supabase:', error);
            throw new Error('Falha ao salvar o plano de aula no banco de dados.');
        }

        console.log('Plano de aula salvo com sucesso:', planos_aula_data[0].id);
        
        return planoJson;
    } catch (error) {
        throw new Error(`Erro: ${error.message}`);
    }
}

module.exports = {salvarPlano};