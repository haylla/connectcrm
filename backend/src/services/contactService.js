const repository =
    require('../repositories/contactRepository');

 const pipelineService =
    require('./pipelineService');

async function create(contact) {
 
    const stage =
await pipelineService.getDefaultStage(
    contact.company_id
);

if (!stage) {

    throw new Error(
        'Nenhuma etapa padrão encontrada para esta empresa.'
    );
}
contact.stage_id = stage.id;

    return repository.create(contact);

}
async function findAll(companyId) {

    return await repository.findAll(companyId);

}
async function update(id, contact) {

    return await repository.update(id, contact);

}
module.exports = {
    create,
    findAll,
    update
};