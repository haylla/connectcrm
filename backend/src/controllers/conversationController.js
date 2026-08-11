const conversationService =
    require('../services/conversationService');

// =====================================================
// OBTÉM OU CRIA UMA CONVERSA
// =====================================================
async function getOrCreate(req, res) {

    try {

        const conversation =
            await conversationService.getOrCreateConversation(

                req.body

            );

        return res.json(conversation);

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            error: error.message

        });

    }

}

// =====================================================
// ENCERRA UMA CONVERSA
// =====================================================
async function close(req, res) {

    try {

        const { id } = req.params;

        await conversationService.closeConversation(id);

        return res.json({

            success: true,
            message: 'Conversa encerrada.'

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            error: error.message

        });

    }

}

module.exports = {

    getOrCreate,

    close

};