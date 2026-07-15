import {
    Box,
    Typography
} from '@mui/material';

import { useEffect, useState } from 'react';

import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardCard from '../../pages/Dashboard/DashboardCard';

import api from '../../services/api';

import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem('user')
    );

    const [stats, setStats] = useState({
        contacts: 0,
        leads: 0,
        andamento: 0,
        fechados: 0
    });

    async function loadStats() {

        try {

            const token =
                localStorage.getItem('token');

            const response =
                await api.get(
                    '/dashboard',
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setStats(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {
        loadStats();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>

            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    padding: 4
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Dashboard
                </Typography>

                <Box mb={4}>

    <Typography
        variant="h5"
        fontWeight="bold"
    >
        Olá, {user?.name}
    </Typography>

    <Typography
        color="text.secondary"
        mt={1}
    >
        Bem-vinda ao ConnectCRM.
        Acompanhe seus indicadores em tempo real.
    </Typography>

</Box>

                <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 3,
                marginTop: 4
                 }}
>

                    <DashboardCard
                        title="Contatos"
                        value={stats.contacts}
                        subtitle="Atualizado agora"
                        icon={<PeopleIcon fontSize="large" />}
                    />

                    <DashboardCard
                        title="Leads"
                        value={stats.leads}
                        subtitle="Este mês"
                        icon={<TrendingUpIcon fontSize="large" />}
                    />

                    <DashboardCard
                        title="Em andamento"
                        value={stats.andamento}
                        subtitle="Atendimentos"
                        icon={<ChatIcon fontSize="large" />}
                    />

                   <DashboardCard
                        title="Fechados"
                        value={stats.fechados}
                        subtitle="Concluídos"
                        icon={<CheckCircleIcon fontSize="large" />}
                    />

                </Box>

            </Box>

        </Box>
    );
}

export default Dashboard;