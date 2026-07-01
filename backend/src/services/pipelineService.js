const repository =
require('../repositories/pipelineRepository');

async function getDefaultStage(companyId){

    return repository.findDefaultStage(companyId);

}

module.exports = {
    getDefaultStage
};