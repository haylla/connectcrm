const db = require('../config/database');

// =====================================================
// CRIAR CONVERSA
// =====================================================
async function create(conversation) {
console.log('======================');
console.log('REPOSITORY CREATE');
console.log(conversation);
console.log('======================');
    const [result] = await db.query(

        `INSERT INTO conversations
        (
            company_id,
            contact_id,
            status,
            channel
        )
        VALUES (?, ?, ?, ?)`,

        [

            conversation.company_id,

            conversation.contact_id,

            conversation.status,

            conversation.channel

        ]

    );

    return result;

}

// =====================================================
// BUSCA CONVERSA ABERTA DO CONTATO
// =====================================================
async function findOpenConversation(contactId) {

    const [rows] = await db.query(

        `SELECT *
         FROM conversations
         WHERE contact_id = ?
         AND status <> 'CLOSED'
         LIMIT 1`,

        [contactId]

    );

    return rows[0];

}

// =====================================================
// BUSCAR POR ID
// =====================================================
async function findById(id) {

    const [rows] = await db.query(

        `SELECT *
         FROM conversations
         WHERE id = ?`,

        [id]

    );

    return rows[0];

}

// =====================================================
// ENCERRAR CONVERSA
// =====================================================
async function close(id) {

    await db.query(

        `UPDATE conversations

         SET

            status = 'CLOSED',

            closed_at = NOW()

         WHERE id = ?`,

        [id]

    );

}
// =====================================================
// ATUALIZAR STATUS DA CONVERSA
// =====================================================
async function updateStatus(id, status) {

    await db.query(
        `UPDATE conversations
         SET status = ?
         WHERE id = ?`,
        [
            status,
            id
        ]
    );

    return await findById(id);
}
module.exports = {

    create,
    findOpenConversation,
    findById,
    close,
    updateStatus

};