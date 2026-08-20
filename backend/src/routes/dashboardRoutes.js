const express = require('express');

const router = express.Router();

const dashboardController =
    require('../controllers/dashboardController');

const authMiddleware =
    require('../middlewares/authMiddleware');



// =====================================================
// DASHBOARD
// =====================================================

router.get(
    '/',
    authMiddleware,
    dashboardController.getDashboard
);


// =====================================================
// ATENDIMENTOS SEM RESPONSÁVEL
// =====================================================

router.get(
    '/unassigned',
    authMiddleware,
    dashboardController.getUnassigned
);


module.exports = router;