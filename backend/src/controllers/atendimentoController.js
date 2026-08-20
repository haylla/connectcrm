const atendimentoService =
    require('../services/atendimentoService');


// =====================================================
// CRIAR ATENDIMENTO
// =====================================================
async function create(req, res) {

    try {

        const result =
            await atendimentoService.create(req.body);

        return res.status(201).json({

            success: true,

            data: result

        });

    } catch (error) {

        console.error(
            'Erro ao criar atendimento:',
            error
        );

        return res.status(500).json({

            success: false,

            error: error.message

        });

    }

}


// =====================================================
// LISTAR ATENDIMENTOS
// =====================================================
async function findAll(req, res) {

    try {

        const companyId =
            req.query.company_id || 1;

        const result =
            await atendimentoService.findAll(
                companyId
            );

        return res.json(result);

    } catch (error) {

        console.error(
            'Erro ao listar atendimentos:',
            error
        );

        return res.status(500).json({

            success: false,

            error: error.message

        });

    }

}


// =====================================================
// BUSCAR POR ID
// =====================================================
async function findById(req, res) {

    try {

        const result =
            await atendimentoService.findById(
                req.params.id
            );

        if (!result) {

            return res.status(404).json({

                success: false,

                error: 'Atendimento não encontrado'

            });

        }

        return res.json(result);

    } catch (error) {

        console.error(
            'Erro ao buscar atendimento:',
            error
        );

        return res.status(500).json({

            success: false,

            error: error.message

        });

    }

}


// =====================================================
// ATUALIZAR STATUS
// =====================================================
async function updateStatus(req, res) {

    try {

        const result =
            await atendimentoService.updateStatus(

                req.params.id,

                req.body.status

            );

        return res.json({

            success: true,

            data: result

        });

    } catch (error) {

        console.error(
            'Erro ao atualizar status:',
            error
        );

        return res.status(400).json({

            success: false,

            error: error.message

        });

    }

}


// =====================================================
// ATUALIZAR RESPONSÁVEL
// =====================================================
async function updateAssignedUser(req, res) {

    try {

        const result =
            await atendimentoService.updateAssignedUser(

                req.params.id,

                req.body.assigned_user_id

            );

        return res.json({

            success: true,

            data: result

        });

    } catch (error) {

        console.error(
            'Erro ao atualizar responsável:',
            error
        );

        return res.status(400).json({

            success: false,

            error: error.message

        });

    }

}


// =====================================================
// ENCERRAR ATENDIMENTO
// =====================================================
async function close(req, res) {

    try {

        const result =
            await atendimentoService.close(
                req.params.id
            );

        return res.json({

            success: true,

            data: result

        });

    } catch (error) {

        console.error(
            'Erro ao encerrar atendimento:',
            error
        );

        return res.status(400).json({

            success: false,

            error: error.message

        });

    }

}


// =====================================================
// EXPORTAÇÕES
// =====================================================
module.exports = {

    create,

    findAll,

    findById,

    updateStatus,

    updateAssignedUser,

    close

};