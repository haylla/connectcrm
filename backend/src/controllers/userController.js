const service =
    require('../services/userService');

// =====================================================
// LISTAR USUÁRIOS
// =====================================================
async function findAll(req, res) {

    try {

        const users =
            await service.findAll(1);

        return res.json(users);

    } catch (error) {

        return res.status(500).json({

            error: error.message

        });

    }

}

// =====================================================
// CRIAR
// =====================================================
async function create(req, res) {

    try {

        const result =
            await service.create(req.body);

        return res.status(201).json(result);

    } catch (error) {

        return res.status(500).json({

            error: error.message

        });

    }

}

// =====================================================
// ATUALIZAR
// =====================================================
async function update(req, res) {

    try {

        const result =
            await service.update(

                req.params.id,

                req.body

            );

        return res.json(result);

    } catch (error) {

        return res.status(500).json({

            error: error.message

        });

    }

}

// =====================================================
// EXCLUIR
// =====================================================
async function remove(req, res) {

    try {

        await service.remove(

            req.params.id

        );

        return res.json({

            success: true

        });

    } catch (error) {

        return res.status(500).json({

            error: error.message

        });

    }

}

module.exports = {

    findAll,
    create,
    update,
    remove

};