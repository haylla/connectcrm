console.log('>>> messageController carregado <<<');
const messageService =
    require('../services/messageService');



// =====================================================
// ENVIA MENSAGEM PELO CRM
// =====================================================
async function create(req, res) {

    try {

        console.log('BODY RECEBIDO:');
        console.log(req.body);

        console.log('ANTES DO SEND MESSAGE');

        await messageService.sendMessage(req.body);

        console.log('DEPOIS DO SEND MESSAGE');

        return res.status(201).json({

            success: true,
            message: 'Mensagem enviada com sucesso.'

        });

    } catch (error) {

        console.log('ERRO CAPTURADO NO CONTROLLER:');
        console.error(error);

        return res.status(500).json({

            success: false,
            error: error.message

        });

    }

}
// =====================================================
// WEBHOOK DO N8N
// -----------------------------------------------------
// Recebe mensagens processadas pelo fluxo do N8N.
//
// Fluxo:
//
// N8N
// ↓
// messageController
// ↓
// messageService
// ↓
// MySQL
// =====================================================
async function webhook(req, res) {

    try {

        await messageService.saveIncomingMessageByPhone(

            req.body

        );

        return res.status(201).json({

            success: true,
            message: 'Mensagem recebida.'

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            error: error.message

        });

    }

}

// =====================================================
// LISTAR MENSAGENS
// =====================================================
async function findByConversation(req, res) {

    try {

        const { conversationId } = req.params;

        const messages =

            await messageService.findByConversation(

                conversationId

            );

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
    webhook,
    findByConversation

};