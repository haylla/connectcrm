const pipelineService =
    require('../services/pipelineService');

async function findAll(req, res) {

    try {

        const companyId = 1;

        const stages =
            await pipelineService.findAll(companyId);

        return res.json(stages);

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            error: error.message

        });

    }

}
async function updateStage(req, res) {

    try {

        const { id } = req.params;
        const { stage_id } = req.body;

        await pipelineService.updateStage(id, stage_id);

        return res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }

}

module.exports = {
    findAll,
    updateStage
};