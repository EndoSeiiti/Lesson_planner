
# Sobre o projeto
Este é um projeto feito com o auxilio da Gemini AI com o intuito de criar planos de aulas de forma rapida e detalhada, preenchendo os dados do mesmo em um banco de dado usando a ferramenta Supabase.
O usuário preenche os campos de tema, duração,serie/ano,componente curricular e seu próprio nome e então a IA gera o plano de aula de forma detalhada com o objetivo, introdução lúdica, rubrica de avaliaçãoe passo a passo da atividade.

# Como rodar o projeto

Para executar o projeto, após configurar as variáveis de ambiente, abra o terminal na pasta do projeto e digite:

```bash
npm start
```

## Configurar as variáveis de ambiente
Para configurar as variávies de ambiente, são necessárias as chaves localizadas no arquivo "example.env".
Para obtê-las, siga os seguintes passos:

SUPABASE_URL: Ao fazer login no site https://supabase.com/, na aba lateral esquerda, clique em Project Settings e então em Data API. A chave será o URL na janela entitulada "Project URL".

SUPABASE_SERVICE_KEY: Ao fazer login no site https://supabase.com/, na aba lateral esquerda, clique em Project Settings e então em API Keys.A chave estará no campo entitulado "servise_role/secret".

GEMINI_API_KEY= Ao fazer login no site https://aistudio.google.com/, na aba lateral esquerda, clique em Get API Key e então, no canto superior direito, clique em Criar chave da API.Dê um nome à chave,selecione ou crie um projeto.Agora, na aba à esquerda clique em API Keys. Nessa aba poderão ser vistas suas Keys, onde estas poderão ser copiadas para ser usadas.

# Desafios encontrados e soluções
Durante o desenvolvimento, tive dificuldades com os campos a serem preenchidos na interface do frontend.
Para solucionar este problema, coloquei um campo para cada informação a ser dada à inteligencia artificial

Tive também problemas ao pedir o formato correto à IA para preencher os dados de forma correta.
Para corrigir isso, estudei a formulação prompts para clarificar para o Gemini o formato de saida esperado.

# Decisões técnicas
Para o gerenciamento do banco de dados foi utilizado o Supabase por oferecer um ecossistema completo com base PostgreSQL, fornecendo armazenamento de dados de forma automatizada, acelerando a criação do Backend.

## Modelo da IA
Haviam dois modelos disponíveis, o Gemini 2.5 Flash e o Gemini 2.5 Pro, escilhi o modelo Gemini 2.5 Flash por fornecer respostas mais rápidas, supre a necessidade do projeto e tem menor custo que a versão Pro. 

## Modelagem do banco
Devido à forma em que a saida da IA é formulada, optei por modelar o banco de dados de forma em que as tabelas "passo_a_passo" e "rubrica_avaliacao" tenham uma relação one-to-many com a table principal "planos_aula", já que um plano de aula pode conter vários passo a passo e rúbricas de avaliação, mantendo a consistência no banco de dados relacional.
