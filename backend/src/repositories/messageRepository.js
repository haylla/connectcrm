const db = require('../config/database');

// =====================================================
// CRIAR MENSAGEM
// =====================================================
async function create(message) {

    const [result] = await db.query(

        `INSERT INTO messages
        (
            conversation_id,
            sender,
            message,
            created_at
        )
        VALUES (?, ?, ?, NOW())`,

        [
            message.conversation_id,
            message.sender,
            message.message
        ]

    );

    return result;

}

// =====================================================
// LISTAR MENSAGENS DA CONVERSA
// =====================================================
async function findByConversation(conversationId) {

    const [rows] = await db.query(

        `SELECT *
         FROM messages
         WHERE conversation_id = ?
         ORDER BY created_at ASC`,

        [conversationId]

    );

    return rows;

}

module.exports = {

    create,

    findByConversation

};