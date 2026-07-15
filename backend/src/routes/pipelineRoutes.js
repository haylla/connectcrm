const express = require('express');

const router = express.Router();

const pipelineController =
    require('../controllers/pipelineController');

router.get(
    '/',    pipelineController.findAll);

router.put(
    '/contact/:id',
    pipelineController.updateStage);


module.exports = router;