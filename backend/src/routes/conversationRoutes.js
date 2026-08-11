const express = require('express');

const controller =
    require('../controllers/conversationController');

const router = express.Router();

// =====================================================
// OBTÉM OU CRIA UMA CONVERSA
// =====================================================
router.post(

    '/',

    controller.getOrCreate

);

// =====================================================
// ENCERRA CONVERSA
// =====================================================
router.patch(

    '/:id/close',

    controller.close

);

module.exports = router;