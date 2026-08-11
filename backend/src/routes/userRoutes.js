const express = require('express');

const controller =
    require('../controllers/userController');

const router = express.Router();

router.get(
    '/',
    controller.findAll
);

router.post(
    '/',
    controller.create
);

router.put(
    '/:id',
    controller.update
);

router.delete(
    '/:id',
    controller.remove
);

module.exports = router;