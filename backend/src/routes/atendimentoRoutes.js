const express = require('express');

const router = express.Router();

const atendimentoController =
    require('../controllers/atendimentoController');


// =====================================================
// CRIAR ATENDIMENTO
// =====================================================
router.post(
    '/',
    atendimentoController.create
);


// =====================================================
// LISTAR ATENDIMENTOS
// =====================================================
router.get(
    '/',
    atendimentoController.findAll
);


// =====================================================
// BUSCAR ATENDIMENTO POR ID
// =====================================================
router.get(
    '/:id',
    atendimentoController.findById
);


// =====================================================
// ATUALIZAR STATUS
// =====================================================
router.patch(
    '/:id/status',
    atendimentoController.updateStatus
);


// =====================================================
// ALTERAR RESPONSÁVEL
// =====================================================
router.patch(
    '/:id/responsavel',
    atendimentoController.updateAssignedUser
);


// =====================================================
// ENCERRAR ATENDIMENTO
// =====================================================
router.patch(
    '/:id/close',
    atendimentoController.close
);


module.exports = router;