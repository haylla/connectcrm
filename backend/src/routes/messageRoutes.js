const express = require('express');

const controller =
    require('../controllers/messageController');

const router = express.Router();

// =====================================================
// LISTAR MENSAGENS DE UM CONTATO
// =====================================================
router.get(
    '/conversation/:conversationId',
    controller.findByConversation
);
// =====================================================
// ENVIO DE MENSAGEM PELO CRM
// =====================================================
router.post(
    '/',
    controller.create
);

// =====================================================
// WEBHOOK DO N8N
// Recebe mensagens pela IA
// =====================================================
router.post(
    '/webhook',
    controller.webhook
);

module.exports = router;