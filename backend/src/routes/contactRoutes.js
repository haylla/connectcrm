const express = require('express');

const router = express.Router();

const controller =
    require('../controllers/contactController');

router.post(
    '/',
    controller.create
);

router.get(
    '/',
    controller.findAll
);
router.put(
    '/:id',
    controller.update
);

module.exports = router;