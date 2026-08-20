const dashboardRepository =
    require('../repositories/dashboardRepository');


// =====================================================
// DASHBOARD
// =====================================================

async function getDashboard(companyId) {

    const stats =
        await dashboardRepository.getStats(
            companyId
        );


    const contacts =
        await dashboardRepository.getContacts(
            companyId
        );


    const unassigned =
        await dashboardRepository.getUnassigned(
            companyId
        );


    const byUser =
        await dashboardRepository.getByUser(
            companyId
        );


    const recent =
        await dashboardRepository.getRecent(
            companyId
        );


    return {

        contacts,

        stats,

        unassigned,

        byUser,

        recent

    };

}


// =====================================================
// ATENDIMENTOS SEM RESPONSÁVEL
// =====================================================

async function getUnassigned(companyId) {

    return await dashboardRepository.getUnassigned(
        companyId
    );

}
// =====================================================
// LISTAR ATENDIMENTOS SEM RESPONSÁVEL
// =====================================================

async function getUnassignedList(companyId) {

    return await dashboardRepository.getUnassignedList(
        companyId
    );

}

// =====================================================
// EXPORTAÇÕES
// =====================================================

module.exports = {

    getDashboard,
    getUnassigned,
    getUnassignedList

};