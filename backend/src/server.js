require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

console.log('Banco:', process.env.DB_NAME);
console.log('Host:', process.env.DB_HOST);