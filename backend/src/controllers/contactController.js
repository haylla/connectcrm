const service =
    require('../services/contactService');

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

async function update(req, res) {

    const result =
        await service.update(
            req.params.id,
            req.body
        );

    res.json(result);

}

async function findAll(req, res) {

    try {

        const contacts =
            await service.findAll(1);

        return res.json(contacts);

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

}

module.exports = {
    create,
    findAll,
    update
};