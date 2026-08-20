const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');


// =====================================================
// REGISTRAR USUÁRIO
// =====================================================
async function register(data) {

    const hashedPassword =
        await bcrypt.hash(data.password, 10);

    return await userRepository.createUser({

        company_id: data.company_id,

        name: data.name,

        email: data.email,

        password: hashedPassword,

        role: data.role || 'AGENT',

        status: data.status || 'ACTIVE'

    });

}


// =====================================================
// LOGIN
// =====================================================
async function login(email, password) {

    const user =
        await userRepository.findByEmail(email);


    // Usuário não encontrado
    if (!user) {

        throw new Error(
            'Usuário não encontrado'
        );

    }


    // Usuário inativo
    if (user.status !== 'ACTIVE') {

        throw new Error(
            'Usuário inativo. Entre em contato com o administrador.'
        );

    }


    // Validar senha
    const validPassword =
        await bcrypt.compare(
            password,
            user.password
        );


    if (!validPassword) {

        throw new Error(
            'Senha inválida'
        );

    }


    // Criar token
    const token = jwt.sign(

        {
            id: user.id,

            email: user.email,

            role: user.role,

            company_id: user.company_id

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

            email: user.email,

            role: user.role,

            status: user.status,

            company_id: user.company_id

        }

    };

}


module.exports = {
    register,
    login
};