const express = require('express');

const controller =
    require('../controllers/messageController');

const router = express.Router();

router.get(
    '/:contactId',
    controller.findByContact
);

router.post(
    '/',
    controller.create
);

module.exports = router;