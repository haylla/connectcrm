const bcrypt = require('bcryptjs');

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

    const hashedPassword = await bcrypt.hash(
        user.password,
        10
    );

    return await repository.createUser({

        ...user,

        password: hashedPassword

    });

}
// =====================================================
// ATUALIZAR
// =====================================================
async function update(id, user) {

    if (user.password && user.password.trim()) {

        const hashedPassword = await bcrypt.hash(
            user.password,
            10
        );

        return await repository.update(

            id,

            {
                ...user,
                password: hashedPassword
            }

        );

    }

    return await repository.update(

        id,

        {
            ...user,
            password: null
        }

    );

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