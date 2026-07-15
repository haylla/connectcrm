const repository =
    require('../repositories/pipelineRepository');

const contactRepository =
    require('../repositories/contactRepository');

async function getDefaultStage(companyId) {

    return repository.findDefaultStage(companyId);

}

async function findAll(companyId) {

    const stages =
        await repository.findAll(companyId);

    const contacts =
        await contactRepository.findByCompany(companyId);

    stages.forEach(stage => {

        stage.contacts = contacts.filter(contact =>
            contact.stage_id === stage.id
        );

    });

    return stages;

}

async function updateStage(contactId, stageId) {

    return repository.updateStage(contactId, stageId);

}

module.exports = {
    getDefaultStage,
    findAll,
    updateStage
};