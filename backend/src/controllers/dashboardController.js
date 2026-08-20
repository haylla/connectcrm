const dashboardService =
    require('../services/dashboardService');


// =====================================================
// DASHBOARD
// =====================================================

async function getDashboard(req, res) {

    try {

        const companyId =
            req.user?.company_id || 1;


        const result =
            await dashboardService.getDashboard(
                companyId
            );


        return res.json(result);


    } catch (error) {

        console.error(
            'Erro ao carregar dashboard:',
            error
        );


        return res.status(500).json({

            success: false,

            error: error.message

        });

    }

}


// =====================================================
// ATENDIMENTOS SEM RESPONSÁVEL
// =====================================================

async function getUnassigned(req, res) {

    try {

        const companyId =
            req.user?.company_id || 1;


        const result =
            await dashboardService.getUnassigned(
                companyId
            );


        return res.json(result);


    } catch (error) {

        console.error(
            'Erro ao buscar atendimentos sem responsável:',
            error
        );


        return res.status(500).json({

            success: false,

            error: error.message

        });

    }

}
// =====================================================
// LISTAR ATENDIMENTOS SEM RESPONSÁVEL
// =====================================================

async function getUnassigned(req, res) {

    try {

        const companyId =
            req.user?.company_id || 1;


        const result =
            await dashboardService.getUnassignedList(
                companyId
            );


        return res.json(result);


    } catch (error) {

        console.error(
            'Erro ao buscar atendimentos sem responsável:',
            error
        );


        return res.status(500).json({

            success: false,

            error: error.message

        });

    }

}

// =====================================================
// EXPORTAÇÕES
// =====================================================

module.exports = {

    getDashboard,
    getUnassigned

};