const db = require('../config/database');

// =====================================================
// NORMALIZAR TELEFONE
// =====================================================
// Remove tudo que não for número.
// Também permite comparar algumas variações comuns
// de números brasileiros recebidos pelo WhatsApp.
// =====================================================
function normalizePhone(phone) {

    if (!phone) {
        return '';
    }

    return String(phone).replace(/\D/g, '');

}

// =====================================================
// GERAR VARIAÇÕES DO TELEFONE
// =====================================================
function getPhoneVariants(phone) {

    const normalized = normalizePhone(phone);

    if (!normalized) {
        return [];
    }

    const variants = new Set();

    variants.add(normalized);

    // =================================================
    // BRASIL
    // =================================================
    // Exemplo recebido:
    // 554191338112
    //
    // Cadastrado:
    // 5541991338112
    //
    // Quando vier sem o 9 do celular:
    // 55 + DDD + número de 8 dígitos
    //
    // adicionamos o 9 depois do DDD.
    // =================================================

    if (
        normalized.startsWith('55') &&
        normalized.length === 12
    ) {

        const country = normalized.substring(0, 2);
        const ddd = normalized.substring(2, 4);
        const number = normalized.substring(4);

        variants.add(
            country +
            ddd +
            '9' +
            number
        );

    }

    // =================================================
    // Caso venha com 13 dígitos e possua o 9,
    // também geramos a versão sem o 9.
    // =================================================

    if (
        normalized.startsWith('55') &&
        normalized.length === 13 &&
        normalized.charAt(4) === '9'
    ) {

        const country = normalized.substring(0, 2);
        const ddd = normalized.substring(2, 4);
        const number = normalized.substring(5);

        variants.add(
            country +
            ddd +
            number
        );

    }

    return [...variants];

}

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
    console.log(
        'Telefone recebido:',
        JSON.stringify(phone)
    );

    const normalizedPhone =
        normalizePhone(phone);

    const variants =
        getPhoneVariants(phone);

    console.log(
        'Telefone normalizado:',
        normalizedPhone
    );

    console.log(
        'Variações consideradas:',
        variants
    );

    const [rows] = await db.query(

        'SELECT * FROM contacts'

    );

    console.log(
        'Total de contatos:',
        rows.length
    );

    const contact = rows.find(c => {

        const databasePhone =
            normalizePhone(c.phone);

        const found =
            variants.includes(databasePhone);

        console.log(
            `Banco: "${c.phone}" -> "${databasePhone}" | Recebido: "${phone}" -> "${normalizedPhone}" | Match: ${found}`
        );

        return found;

    });

    console.log(
        'Contato encontrado:',
        contact
    );

    console.log(
        '=============================='
    );

    return contact;

}

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