const db = require('../config/database');


// =====================================================
// CRIAR ATENDIMENTO
// =====================================================
async function create(atendimento) {

    const [result] = await db.query(

        `INSERT INTO atendimentos
        (
            company_id,
            contact_id,
            assigned_user_id,
            type,
            status,
            priority
        )
        VALUES (?, ?, ?, ?, ?, ?)`,

        [
            atendimento.company_id,
            atendimento.contact_id,
            atendimento.assigned_user_id,
            atendimento.type,
            atendimento.status,
            atendimento.priority
        ]

    );

    return result;
}


// =====================================================
// LISTAR ATENDIMENTOS
// =====================================================
async function findAll(companyId) {

    const [rows] = await db.query(

        `SELECT
            a.id,
            a.company_id,
            a.contact_id,
            a.assigned_user_id,
            a.type,
            a.status,
            a.priority,
            a.created_at,
            a.updated_at,
            a.closed_at,

            c.name AS contact_name,
            c.phone AS contact_phone,

            u.name AS assigned_user_name

        FROM atendimentos a

        INNER JOIN contacts c
            ON c.id = a.contact_id

        LEFT JOIN users u
            ON u.id = a.assigned_user_id

        WHERE a.company_id = ?

        ORDER BY a.created_at DESC`,

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
            a.id,
            a.company_id,
            a.contact_id,
            a.assigned_user_id,
            a.type,
            a.status,
            a.priority,
            a.created_at,
            a.updated_at,
            a.closed_at,

            c.name AS contact_name,
            c.phone AS contact_phone,

            u.name AS assigned_user_name

        FROM atendimentos a

        INNER JOIN contacts c
            ON c.id = a.contact_id

        LEFT JOIN users u
            ON u.id = a.assigned_user_id

        WHERE a.id = ?`,

        [id]

    );

    return rows[0];
}


// =====================================================
// ATUALIZAR STATUS
// =====================================================
async function updateStatus(id, status) {

    const [result] = await db.query(

        `UPDATE atendimentos
         SET status = ?
         WHERE id = ?`,

        [
            status,
            id
        ]

    );

    return result;
}


// =====================================================
// ATUALIZAR RESPONSÁVEL
// =====================================================
async function updateAssignedUser(
    id,
    assignedUserId
) {

    const [result] = await db.query(

        `UPDATE atendimentos
         SET assigned_user_id = ?
         WHERE id = ?`,

        [
            assignedUserId,
            id
        ]

    );

    return result;
}


// =====================================================
// ENCERRAR ATENDIMENTO
// =====================================================
async function close(id) {

    const [result] = await db.query(

        `UPDATE atendimentos
         SET
            status = 'CLOSED',
            closed_at = NOW()
         WHERE id = ?`,

        [id]

    );

    return result;
}


// =====================================================
// EXPORTAÇÕES
// =====================================================
module.exports = {

    create,
    findAll,
    findById,
    updateStatus,
    updateAssignedUser,
    close

};