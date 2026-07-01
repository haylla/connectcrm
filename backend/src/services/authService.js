const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');

async function register(data) {

    const hashedPassword =
        await bcrypt.hash(data.password, 10);

    return await userRepository.createUser({
        company_id: data.company_id,
        name: data.name,
        email: data.email,
        password: hashedPassword
    });
}

module.exports = {
    register
};

async function login(email, password) {

    const user =
        await userRepository.findByEmail(email);

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const validPassword =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!validPassword) {
        throw new Error('Senha inválida');
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '8h'
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}
module.exports = {
    register,
    login
};
