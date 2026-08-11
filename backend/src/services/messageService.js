const repository =
    require('../repositories/messageRepository');

const contactRepository =
    require('../repositories/contactRepository');

const conversationService =
    require('./conversationService');

const whatsappService =
    require('./whatsappService');

// =====================================================
// ENVIA MENSAGEM PELO CRM
// =====================================================
async function sendMessage(message) {

    console.log('MESSAGE SERVICE:');
    console.log(message);

    const conversation =

        await conversationService.getOrCreateConversation({

            company_id: message.company_id,

            contact_id: message.contact_id

        });

        console.log('SALVANDO MENSAGEM:');

console.log({
    conversation_id: conversation.id,
    sender: message.sender,
    message: message.message
});

    await repository.create({

        conversation_id: conversation.id,

        sender: message.sender,

        message: message.message

    });

    const contact =

        await contactRepository.findById(

            message.contact_id

        );

    if (!contact) {

        throw new Error(

            'Contato não encontrado.'

        );

    }

    await whatsappService.sendMessage(

        contact.phone,

        message.message

    );

}

// =====================================================
// WEBHOOK DO N8N
// =====================================================
async function saveIncomingMessageByPhone(data) {

    console.log('==========================');
    console.log('Telefone recebido:', data.phone);
    console.log('Tipo:', typeof data.phone);

    const contact =

        await contactRepository.findByPhone(

            data.phone

        );

    console.log('Contato encontrado:', contact);
    console.log('==========================');

    if (!contact) {

        throw new Error(

            'Contato não encontrado.'

        );

    }

    const conversation =

        await conversationService.getOrCreateConversation({

            company_id: contact.company_id,

            contact_id: contact.id

        });

    await repository.create({

        conversation_id: conversation.id,

        sender: data.sender,

        message: data.message

    });

}

// =====================================================
// LISTAR MENSAGENS
// =====================================================
async function findByConversation(conversationId) {

    return await repository.findByConversation(

        conversationId

    );

}

module.exports = {

    sendMessage,

    saveIncomingMessageByPhone,

    findByConversation

};