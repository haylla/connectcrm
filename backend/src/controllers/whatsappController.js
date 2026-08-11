const whatsappService =
    require('../services/whatsappService');

// =====================================================
// ENVIO DE MENSAGENS
// =====================================================
async function send(req, res) {

    try {

        const { number, text } = req.body;

        const response =
            await whatsappService.sendMessage(
                number,
                text
            );

        return res.json({
            success: true,
            data: response
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
// WEBHOOK DA EVOLUTION
// =====================================================
// Recebe todos os eventos enviados pela Evolution API.
// Nesta primeira etapa apenas exibiremos o conteúdo no
// console para entender a estrutura dos dados.
// =====================================================
async function webhook(req, res) {

    try {

        console.log('==============================');
        console.log('WEBHOOK RECEBIDO');
        console.log(JSON.stringify(req.body, null, 2));
        console.log('==============================');

        return res.status(200).json({
            success: true
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
    send,
    webhook
};