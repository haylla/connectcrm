const db = require('../config/database');

async function createUser(user) {

    const [result] = await db.query(
        `INSERT INTO users
        (company_id, name, email, password)
        VALUES (?, ?, ?, ?)`,
        [
            user.company_id,
            user.name,
            user.email,
            user.password
        ]
    );

    return result;
}

module.exports = {
    createUser
};

async function findByEmail(email) {

    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    return rows[0];
}
module.exports = {
    createUser,
    findByEmail
};