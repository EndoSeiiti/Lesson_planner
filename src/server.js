const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config(); 
const { geradorPlano } = require('./ai.service'); 
const { salvarPlano } = require('./db.service');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/gerar', async (req, res) => {
    const inputs = req.body; 

   
    if (!inputs.tema || !inputs.serie_ano || !inputs.componente_curricular || !inputs.duracao) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        
        const planoGeradoObjeto = await geradorPlano(inputs);
        
        
        const novoPlanoSalvo = await salvarPlano(inputs, planoGeradoObjeto);

        
        res.status(200).json({ 
            message: 'Plano gerado e salvo com sucesso!',
            plano_completo: novoPlanoSalvo, // Retorna o campo 'plano' salvo
        });

    } catch (error) {
        console.error("Falha no processo:", error.message);
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Acesse o frontend em http://localhost:${PORT}`);
});