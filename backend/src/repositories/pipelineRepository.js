const db = require('../config/database');

async function findDefaultStage(companyId) {

    const [rows] = await db.query(
        `SELECT *
         FROM pipeline_stages
         WHERE company_id = ?
         AND is_default = true
         LIMIT 1`,
        [companyId]
    );

    return rows[0];

}

module.exports = {
    findDefaultStage
};
async function findAll(companyId) {

    const [rows] = await db.query(

        `SELECT *
         FROM pipeline_stages
         WHERE company_id = ?
         ORDER BY position`,

        [companyId]

    );

    return rows;

}
async function updateStage(contactId, stageId) {

    const [result] = await db.query(

        `UPDATE contacts
         SET stage_id = ?
         WHERE id = ?`,

        [stageId, contactId]

    );

    return result;

}
module.exports = {
    findDefaultStage,
    findAll,
    updateStage
};