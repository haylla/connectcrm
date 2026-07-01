const authService =
    require('../services/authService');

async function register(req, res) {

    try {

        const result =
            await authService.register(req.body);

        return res.status(201).json({
            success: true,
            data: result
        });

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

}

module.exports = {
    register
};
async function login(req, res) {

    try {

        const result =
            await authService.login(
                req.body.email,
                req.body.password
            );

        return res.json(result);

    } catch (error) {

        return res.status(401).json({
            error: error.message
        });

    }

}
module.exports = {
    register,
    login
};