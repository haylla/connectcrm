const db = require('../config/database');


// =====================================================
// CRIAR USUÁRIO
// =====================================================
async function createUser(user) {

    const [result] = await db.query(

        `INSERT INTO users
        (
            company_id,
            name,
            email,
            password,
            role,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?)`,

        [
            user.company_id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.status
        ]

    );

    return result;
}


// =====================================================
// LISTAR USUÁRIOS
// =====================================================
async function findAll(companyId) {

    const [rows] = await db.query(

        `SELECT
            id,
            company_id,
            name,
            email,
            created_at,
            role,
            status
         FROM users
         WHERE company_id = ?
         ORDER BY name`,

        [companyId]

    );

    return rows;
}


// =====================================================
// BUSCAR POR ID
// =====================================================
async function findById(id) {

    const [rows] = await db.query(

        `SELECT
            id,
            company_id,
            name,
            email,
            role,
            status
         FROM users
         WHERE id = ?`,

        [id]

    );

    return rows[0];
}


// =====================================================
// ATUALIZAR
// =====================================================
async function update(id, user) {

    const [result] = await db.query(

        `UPDATE users
         SET
            name = ?,
            email = ?,
            role = ?,
            status = ?
         WHERE id = ?`,

        [
            user.name,
            user.email,
            user.role,
            user.status,
            id
        ]

    );

    return result;
}


// =====================================================
// EXCLUIR
// =====================================================
async function remove(id) {

    await db.query(

        `DELETE FROM users
         WHERE id = ?`,

        [id]

    );

}


// =====================================================
// BUSCAR POR E-MAIL
// =====================================================
async function findByEmail(email) {

    const [rows] = await db.query(

        'SELECT * FROM users WHERE email = ?',

        [email]

    );

    return rows[0];
}


// =====================================================
// EXPORTAÇÕES
// =====================================================
module.exports = {

    createUser,
    findByEmail,
    findAll,
    findById,
    update,
    remove

};