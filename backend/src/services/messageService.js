const repository =
    require('../repositories/messageRepository');

const contactRepository =
    require('../repositories/contactRepository');

const whatsappService =
    require('./whatsappService');

async function create(message) {

    await repository.create(message);

    const contact =
        await contactRepository.findById(message.contact_id);

    if (contact) {

        await whatsappService.sendMessage(

            contact.phone,

            message.message

        );

    }

}

async function findByContact(contactId) {

    return await repository.findByContact(contactId);

}

module.exports = {
    create,
    findByContact
};