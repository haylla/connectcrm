const express =
    require('express');

const router =
    express.Router();

const controller =
    require('../controllers/whatsappController');

router.post(
    '/send',
    controller.send
);

module.exports = router;