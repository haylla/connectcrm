const whatsappService =
    require('../services/whatsappService');

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

module.exports = {
    send
};