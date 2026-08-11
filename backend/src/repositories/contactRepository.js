const db = require('../config/database');

// =====================================================
// CRIAR CONTATO
// =====================================================
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

// =====================================================
// LISTAR TODOS OS CONTATOS
// =====================================================
async function findAll(companyId) {

    const [rows] = await db.query(

        'SELECT * FROM contacts WHERE company_id = ?',

        [companyId]

    );

    return rows;

}

// =====================================================
// LISTAR CONTATOS DA EMPRESA
// =====================================================
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

// =====================================================
// BUSCAR CONTATO POR ID
// =====================================================
async function findById(id) {

    const [rows] = await db.query(

        'SELECT * FROM contacts WHERE id = ?',

        [id]

    );

    return rows[0];

}
// =====================================================
// BUSCAR CONTATO PELO TELEFONE
// =====================================================
async function findByPhone(phone) {

    console.log('==============================');
    console.log('Telefone recebido:', JSON.stringify(phone));
    console.log('Tamanho:', phone.length);

    const [rows] = await db.query(

        'SELECT * FROM contacts'

    );

    console.log('Total de contatos:', rows.length);

    const contact = rows.find(c => {

        console.log(
            `Banco: "${c.phone}" (${String(c.phone).length}) | Recebido: "${phone}" (${phone.length})`
        );

        return String(c.phone).trim() === String(phone).trim();

    });

    console.log('Contato encontrado:', contact);
    console.log('==============================');

    return contact;

}
// =====================================================
// BUSCAR CONTATO PELO TELEFONE
// Utilizado pelo webhook do N8N.
// =====================================================
//async function findByPhone(phone) {

    //const [rows] = await db.query(

        //`SELECT *
        // FROM contacts
        // WHERE phone = ?`,

        //[phone]

    //);

    //return rows[0];

//}

// =====================================================
// ATUALIZAR CONTATO
// =====================================================
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

module.exports = {

    create,
    findAll,
    findByCompany,
    findById,
    findByPhone,
    update

};