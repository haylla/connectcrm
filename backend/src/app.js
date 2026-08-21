const path = require('path');
const express = require('express');
const cors = require('cors');

const db = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const contactRoutes = require('./routes/contactRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const pipelineRoutes = require('./routes/pipelineRoutes');
const atendimentoRoutes = require('./routes/atendimentoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/pipeline', pipelineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/atendimentos', atendimentoRoutes);

// Servir o frontend React
app.use(express.static(path.join(__dirname, '../public')));

// Rota principal do React
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rotas do React
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        return res.sendFile(
            path.join(__dirname, '../public/index.html')
        );
    }

    next();
});

// Teste da API e conexão com MySQL
app.get('/api', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT NOW() AS data'
        );

        res.json({
            message: 'ConnectCRM API Online',
            mysql: rows
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = app;