const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config(); 
const { geradorPlano } = require('./ai.service'); 
const { salvarPlano } = require('./db.service');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve o frontend (index.html e outros arquivos estáticos)
app.use(express.static(path.join(__dirname))); 

// --- ROTA PRINCIPAL (POST) ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/gerar', async (req, res) => {
    const inputs = req.body; 

   
    if (!inputs.tema || !inputs.serie_ano || !inputs.componente_curricular || !inputs.duracao) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        // 1. Geração pela IA
        const planoGeradoObjeto = await geradorPlano(inputs);
        
        // 2. Salvamento no Supabase
        const novoPlanoSalvo = await salvarPlano(inputs, planoGeradoObjeto);

        // 3. Resposta de Sucesso
        res.status(200).json({ 
            message: 'Plano gerado e salvo com sucesso!',
            plano_completo: novoPlanoSalvo.plano, // Retorna o campo 'plano' salvo
            id: novoPlanoSalvo.id
        });

    } catch (error) {
        console.error("Falha no processo:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// --- INICIALIZAÇÃO ---

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Acesse o frontend em http://localhost:${PORT}`);
});