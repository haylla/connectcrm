const axios = require('axios');

const EVOLUTION_URL = process.env.EVOLUTION_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const INSTANCE = process.env.EVOLUTION_INSTANCE;

async function sendMessage(phone, message) {

    try {

        const url =
            `${EVOLUTION_URL}/message/sendText/${INSTANCE}`;
                    console.log('========== EVOLUTION ==========');
            console.log('URL:', url);
            console.log('API KEY:', EVOLUTION_API_KEY);
            console.log('INSTANCE:', INSTANCE);
            console.log('PHONE:', phone);
            console.log('MESSAGE:', message);
            console.log('===============================');
        const response = await axios.post(
            url,
            {
                number: phone,
                text: message
            },
            {
                headers: {
                    apikey: EVOLUTION_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error('Erro Evolution:');

        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }

        throw error;

    }

}

module.exports = {
    sendMessage
};