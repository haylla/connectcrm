const express =
    require('express');

const router =
    express.Router();

const controller =
    require('../controllers/whatsappController');

// Envio de mensagens para o WhatsApp
router.post(
    '/send',
    controller.send
);

// Webhook da Evolution
router.post(
    '/webhook',
    controller.webhook
);

module.exports = router;