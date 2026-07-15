const db = require('../config/database');

async function create(message) {

    const [result] = await db.query(

        `INSERT INTO messages
        (contact_id, sender, message, created_at)
        VALUES (?, ?, ?, NOW())`,

        [
            message.contact_id,
            message.sender,
            message.message
        ]

    );

    return result;

}

async function findByContact(contactId) {

    const [rows] = await db.query(

        `SELECT *
         FROM messages
         WHERE contact_id = ?
         ORDER BY created_at ASC`,

        [contactId]

    );

    return rows;

}

module.exports = {
    create,
    findByContact
};