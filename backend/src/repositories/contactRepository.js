const db = require('../config/database');
async function create(contact) {

  const [result] = await db.query(
    `INSERT INTO contacts
    (company_id, name, phone, email, stage_id)
    VALUES (?, ?, ?, ?, ?)`,
[
    contact.company_id,
    contact.name,
    contact.phone,
    contact.email,
    contact.stage_id
]
);
    return result;

}
async function findAll(companyId) {
    const [rows] = await db.query(
        'SELECT * FROM contacts WHERE company_id = ?',
        [companyId]
    );
    return rows;
}
async function update(id, contact) {
    const [result] = await db.query(
        `UPDATE contacts
         SET
            name = ?,
            phone = ?,
            email = ?
         WHERE id = ?`,
        [
            contact.name,
            contact.phone,
            contact.email,
            id
        ]
    );

    return result;
}
async function findByCompany(companyId) {

    const [rows] = await db.query(

        `SELECT
            id,
            name,
            phone,
            email,
            stage_id
         FROM contacts
         WHERE company_id = ?
         ORDER BY name`,

        [companyId]

    );

    return rows;

}
module.exports = {
    create,
    findAll,
    findByCompany,
    update
};

async function findById(id) {

    const [rows] = await db.query(

        'SELECT * FROM contacts WHERE id = ?',

        [id]

    );

    return rows[0];

}

