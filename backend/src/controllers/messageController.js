const messageService =
    require('../services/messageService');

async function create(req, res) {

    try {

        await messageService.create(req.body);

        return res.status(201).json({
            success: true,
            message: 'Mensagem salva com sucesso.'
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }

}

async function findByContact(req, res) {

    try {

        const { contactId } = req.params;

        const messages =
            await messageService.findByContact(contactId);

        return res.json(messages);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }

}

module.exports = {
    create,
    findByContact
};