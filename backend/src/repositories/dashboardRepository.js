async function getStats(companyId) {

    const [rows] = await db.query(
        `SELECT
            ps.id,
            ps.name,
            ps.color,
            COUNT(c.id) AS total
         FROM pipeline_stages ps
         LEFT JOIN contacts c
            ON c.stage_id = ps.id
         WHERE ps.company_id = ?
         GROUP BY
            ps.id,
            ps.name,
            ps.color,
            ps.position
         ORDER BY ps.position`,
        [companyId]
    );

    return rows;
}