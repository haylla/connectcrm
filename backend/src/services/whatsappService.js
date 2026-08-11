const axios = require('axios');

// =====================================================
// ENVIA MENSAGEM PARA EVOLUTION API
// =====================================================
async function sendMessage(phone, message) {

    // Remove qualquer caractere que não seja número
    phone = phone.replace(/\D/g, '');

    const url =
        `${process.env.EVOLUTION_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE}`;

    console.log('==========================');
    console.log('ENVIANDO PARA EVOLUTION');
    console.log('URL:', url);
    console.log('PHONE:', phone);
    console.log('MESSAGE:', message);
    console.log('==========================');

    const response = await axios.post(

        url,

        {
            number: phone,
            text: message
        },

        {
            headers: {
                apikey: process.env.EVOLUTION_API_KEY,
                'Content-Type': 'application/json'
            }
        }

    );

    console.log('RESPOSTA EVOLUTION:');
    console.log(response.data);

    return response.data;

}

module.exports = {

    sendMessage

};