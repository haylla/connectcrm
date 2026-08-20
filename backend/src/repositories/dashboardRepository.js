const db = require('../config/database');


// =====================================================
// INDICADORES DO DASHBOARD
// =====================================================
async function getStats(companyId) {

    const [rows] = await db.query(

        `SELECT

            COUNT(*) AS total,

            COALESCE(SUM(status = 'NEW'), 0) AS novos,

            COALESCE(SUM(status = 'IN_PROGRESS'), 0) AS andamento,

            COALESCE(SUM(status = 'PROPOSAL'), 0) AS propostas,

            COALESCE(SUM(status = 'NEGOTIATION'), 0) AS negociacoes,

            COALESCE(SUM(status = 'WAITING_CLIENT'), 0) AS aguardando_cliente,

            COALESCE(SUM(status = 'WAITING_RETURN'), 0) AS aguardando_retorno,

            COALESCE(SUM(status = 'RESOLVED'), 0) AS resolvidos,

            COALESCE(SUM(status = 'CLOSED'), 0) AS fechados,

            COALESCE(SUM(status = 'LOST'), 0) AS perdidos

        FROM atendimentos

        WHERE company_id = ?`,

        [companyId]

    );

    return rows[0];

}


// =====================================================
// TOTAL DE CONTATOS
// =====================================================
async function getContacts(companyId) {

    const [rows] = await db.query(

        `SELECT COUNT(*) AS total
         FROM contacts
         WHERE company_id = ?`,

        [companyId]

    );

    return rows[0].total;

}


// =====================================================
// ATENDIMENTOS SEM RESPONSÁVEL
// =====================================================
async function getUnassigned(companyId) {

    const [rows] = await db.query(

        `SELECT COUNT(*) AS total

         FROM atendimentos

         WHERE company_id = ?

         AND assigned_user_id IS NULL

         AND status NOT IN (
             'CLOSED',
             'LOST'
         )`,

        [companyId]

    );

    return rows[0].total;

}
// =====================================================
// LISTAR ATENDIMENTOS SEM RESPONSÁVEL
// =====================================================
async function getUnassignedList(companyId) {

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

            c.name AS contact_name,
            c.phone AS contact_phone,
            c.email AS contact_email

        FROM atendimentos a

        INNER JOIN contacts c
            ON c.id = a.contact_id

        WHERE a.company_id = ?

        AND a.assigned_user_id IS NULL

        AND a.status NOT IN (
            'CLOSED',
            'LOST'
        )

        ORDER BY a.created_at ASC`,

        [companyId]

    );

    return rows;

}

// =====================================================
// ATENDIMENTOS POR RESPONSÁVEL
// =====================================================
async function getByUser(companyId) {

    const [rows] = await db.query(

        `SELECT

            u.id AS user_id,

            u.name AS user_name,

            COUNT(a.id) AS total,

            COALESCE(
                SUM(a.status = 'NEW'),
                0
            ) AS novos,

            COALESCE(
                SUM(a.status = 'IN_PROGRESS'),
                0
            ) AS andamento,

            COALESCE(
                SUM(a.status = 'PROPOSAL'),
                0
            ) AS propostas,

            COALESCE(
                SUM(a.status = 'NEGOTIATION'),
                0
            ) AS negociacoes,

            COALESCE(
                SUM(a.status = 'WAITING_CLIENT'),
                0
            ) AS aguardando_cliente,

            COALESCE(
                SUM(a.status = 'CLOSED'),
                0
            ) AS fechados

        FROM users u

        LEFT JOIN atendimentos a
            ON a.assigned_user_id = u.id
            AND a.company_id = ?

        WHERE u.company_id = ?

        GROUP BY
            u.id,
            u.name

        ORDER BY total DESC`,

        [
            companyId,
            companyId
        ]

    );

    return rows;

}


// =====================================================
// ATENDIMENTOS RECENTES
// =====================================================
async function getRecent(companyId) {

    const [rows] = await db.query(

        `SELECT

            a.id,

            a.type,

            a.status,

            a.priority,

            a.created_at,

            a.updated_at,

            c.name AS contact_name,

            c.phone AS contact_phone,

            u.name AS assigned_user_name

        FROM atendimentos a

        INNER JOIN contacts c
            ON c.id = a.contact_id

        LEFT JOIN users u
            ON u.id = a.assigned_user_id

        WHERE a.company_id = ?

        ORDER BY a.updated_at DESC

        LIMIT 10`,

        [companyId]

    );

    return rows;

}


// =====================================================
// EXPORTAÇÕES
// =====================================================
module.exports = {

    getStats,
    getContacts,
    getUnassigned,
    getUnassignedList,
    getByUser,
    getRecent

};