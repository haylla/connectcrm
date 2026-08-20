const express = require('express');
const cors = require('cors');

const db = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const contactRoutes = require('./routes/contactRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const messageRoutes = require('./routes/messageRoutes');
const pipelineRoutes = require('./routes/pipelineRoutes');
const atendimentoRoutes = require('./routes/atendimentoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/pipeline',pipelineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/atendimentos',atendimentoRoutes);

app.get('/', async (req, res) => {

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