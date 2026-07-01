import {
    Box,
    Card,
    CardContent,
    Typography
} from '@mui/material';

import Sidebar from
'../../components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import api from '../../services/api';

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

                <Typography>
                    Bem-vindo,
                    {user?.name}
                </Typography>

                <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 3,
                marginTop: 4
                 }}
>

                    <Card sx={{ width: 220 }}>
                        <CardContent>
                            <Typography>
                                👥 Contatos
                            </Typography>
                            <Typography
                                variant="h4"
                            >
                              {stats.contacts}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ width: 220 }}>
                        <CardContent>
                            <Typography>
                                📈 Leads
                            </Typography>
                            <Typography
                                variant="h4"
                            >
                                0
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ width: 220 }}>
                        <CardContent>
                            <Typography>
                                📌 Em andamento
                            </Typography>
                            <Typography
                                variant="h4"
                            >
                                0
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ width: 220 }}>
                        <CardContent>
                            <Typography>
                                ✅ Fechados
                            </Typography>
                            <Typography
                                variant="h4"
                            >
                                0
                            </Typography>
                        </CardContent>
                    </Card>

                </Box>

            </Box>

        </Box>
    );
}

export default Dashboard;