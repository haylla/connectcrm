const db = require('../config/database');

exports.getStats = async (req, res) => {

    try {

        const [contacts] = await db.query(
            'SELECT COUNT(*) AS total FROM contacts'
        );

        res.json({
            contacts: contacts[0].total,
            leads: 0,
            andamento: 0,
            fechados: 0
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};