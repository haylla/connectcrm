const atendimentoRepository =
    require('../repositories/atendimentoRepository');
const userRepository =
    require('../repositories/userRepository');

// =====================================================
// CRIAR ATENDIMENTO
// =====================================================
async function create(data) {

    return await atendimentoRepository.create({

        company_id: data.company_id,

        contact_id: data.contact_id,

        assigned_user_id:
            data.assigned_user_id || null,

        type:
            data.type || 'SALE',

        status:
            data.status || 'NEW',

        priority:
            data.priority || 'NORMAL'

    });

}


// =====================================================
// LISTAR ATENDIMENTOS
// =====================================================
async function findAll(companyId) {

    return await atendimentoRepository.findAll(
        companyId
    );

}


// =====================================================
// BUSCAR POR ID
// =====================================================
async function findById(id) {

    return await atendimentoRepository.findById(
        id
    );

}


// =====================================================
// ATUALIZAR STATUS
// =====================================================
async function updateStatus(id, status) {

   const allowedStatuses = [

    'NEW',

    'IN_PROGRESS',

    'PROPOSAL',

    'NEGOTIATION',

    'WAITING_CLIENT',

    'WAITING_RETURN',

    'RESOLVED',

    'CLOSED',

    'LOST'

];

    if (!allowedStatuses.includes(status)) {

        throw new Error(
            'Status de atendimento inválido'
        );

    }

    return await atendimentoRepository.updateStatus(
        id,
        status
    );

}


// =====================================================
// ATUALIZAR RESPONSÁVEL
// =====================================================
async function updateAssignedUser(
    id,
    assignedUserId
) {

    // Buscar atendimento
    const atendimento =
        await atendimentoRepository.findById(id);

    if (!atendimento) {

        throw new Error(
            'Atendimento não encontrado'
        );

    }


    // Permitir remover responsável
    if (
        assignedUserId === null ||
        assignedUserId === undefined
    ) {

        return await atendimentoRepository
            .updateAssignedUser(
                id,
                null
            );

    }


    // Buscar usuário
    const user =
        await userRepository.findById(
            assignedUserId
        );


    if (!user) {

        throw new Error(
            'Usuário não encontrado'
        );

    }


    // Garantir que usuário e atendimento
    // pertencem à mesma empresa
    if (
        user.company_id !==
        atendimento.company_id
    ) {

        throw new Error(
            'Usuário não pertence à mesma empresa do atendimento'
        );

    }


    // Atualizar responsável
    return await atendimentoRepository
        .updateAssignedUser(
            id,
            assignedUserId
        );

}


// =====================================================
// ENCERRAR ATENDIMENTO
// =====================================================
async function close(id) {

    return await atendimentoRepository.close(
        id
    );

}


// =====================================================
// EXPORTAÇÕES
// =====================================================
module.exports = {

    create,

    findAll,

    findById,

    updateStatus,

    updateAssignedUser,

    close

};