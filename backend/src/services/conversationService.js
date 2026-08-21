const repository =
    require('../repositories/conversationRepository');

// =====================================================
// OBTÉM OU CRIA UMA CONVERSA
// -----------------------------------------------------
// Regra:
//
// Existe conversa aberta?
//
// SIM -> retorna.
//
// NÃO -> cria uma nova.
// =====================================================
async function getOrCreateConversation(data) {

    console.log('==========================');
    console.log('CONVERSATION SERVICE');
    console.log(data);

    let conversation =
        await repository.findOpenConversation(
            data.contact_id
        );

    if (conversation) {

        console.log('CONVERSA EXISTENTE:');
        console.log(conversation);

        return conversation;

    }

    const payload = {

        company_id: data.company_id,
        contact_id: data.contact_id,
        status: 'BOT',
        channel: 'WHATSAPP'

    };

    console.log('PAYLOAD CREATE:');
    console.log(payload);

    const result =
        await repository.create(payload);

    return await repository.findById(
        result.insertId
    );

}



// =====================================================
// ENCERRA UMA CONVERSA
// =====================================================
async function closeConversation(id) {

    await repository.close(id);

}
// =====================================================
// ATUALIZAR STATUS DA CONVERSA
// =====================================================
async function updateConversationStatus(id, status) {

    const allowedStatuses = [
        'BOT',
        'HUMAN',
        'WAITING',
        'CLOSED'
    ];

    if (!allowedStatuses.includes(status)) {

        throw new Error(
            'Status de conversa inválido'
        );

    }

    return await repository.updateStatus(
        id,
        status
    );
}
module.exports = {

    getOrCreateConversation,
    closeConversation,
    updateConversationStatus

};