const repository =
    require('../repositories/userRepository');

// =====================================================
// LISTAR USUÁRIOS
// =====================================================
async function findAll(companyId) {

    return await repository.findAll(companyId);

}

// =====================================================
// BUSCAR POR ID
// =====================================================
async function findById(id) {

    return await repository.findById(id);

}

// =====================================================
// CRIAR USUÁRIO
// =====================================================
async function create(user) {

    return await repository.createUser(user);

}

// =====================================================
// ATUALIZAR
// =====================================================
async function update(id, user) {

    return await repository.update(id, user);

}

// =====================================================
// EXCLUIR
// =====================================================
async function remove(id) {

    return await repository.remove(id);

}

module.exports = {

    findAll,
    findById,
    create,
    update,
    remove

};