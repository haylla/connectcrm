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