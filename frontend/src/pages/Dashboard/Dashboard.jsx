import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    TextField
} from '@mui/material';

import {
    useEffect,
    useState
} from 'react';

import DashboardCard from '../../pages/Dashboard/DashboardCard';

import api from '../../services/api';

import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// =====================================================
// FORMATAÇÃO DE STATUS
// =====================================================

function getStatusChip(status) {

    const statusMap = {

        NEW: {
            label: 'Novo',
            color: 'info'
        },

        IN_PROGRESS: {
            label: 'Em atendimento',
            color: 'primary'
        },

        PROPOSAL: {
            label: 'Proposta',
            color: 'warning'
        },

        NEGOTIATION: {
            label: 'Negociação',
            color: 'secondary'
        },

        WAITING_CLIENT: {
            label: 'Aguardando cliente',
            color: 'warning'
        },

        WAITING_SUPPLIER: {
            label: 'Aguardando fornecedor',
            color: 'default'
        },

        RESOLVED: {
            label: 'Resolvido',
            color: 'success'
        },

        CLOSED: {
            label: 'Fechado',
            color: 'success'
        },

        LOST: {
            label: 'Perdido',
            color: 'error'
        }

    };


    const config =
        statusMap[status] || {
            label: status,
            color: 'default'
        };


    return (
        <Chip
            label={config.label}
            color={config.color}
            size="small"
            variant="outlined"
        />
    );

}
function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem('user')
    );


    const [dashboard, setDashboard] = useState({

        contacts: 0,

        stats: {

            total: 0,
            novos: 0,
            andamento: 0,
            propostas: 0,
            negociacoes: 0,
            aguardando_cliente: 0,
            aguardando_retorno: 0,
            resolvidos: 0,
            fechados: 0,
            perdidos: 0

        },


        byUser: [],

        recent: []

    });

    const [openUnassigned, setOpenUnassigned] = useState(false);

    const [unassignedList, setUnassignedList] = useState([]);

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState('');


    // =====================================================
    // CARREGAR DASHBOARD
    // =====================================================

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


            setDashboard(
                response.data
            );


        } catch (error) {

            console.error(
                'Erro ao carregar dashboard:',
                error
            );

        }

    }

// =====================================================
// ABRIR FILA DE ATENDIMENTOS
// =====================================================

async function loadUnassigned() {

    try {

        const token =
            localStorage.getItem('token');


        const response =
            await api.get(
                '/dashboard/unassigned',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        setUnassignedList(
            response.data
        );


        const usersResponse =
            await api.get(
                '/users',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        setUsers(
            usersResponse.data
        );


        setOpenUnassigned(true);


    } catch (error) {

        console.error(
            'Erro ao carregar fila:',
            error
        );

    }

}
// =====================================================
// ATRIBUIR ATENDIMENTO
// =====================================================

async function assignUser(atendimentoId) {

    if (!selectedUser) {

        alert(
            'Selecione um atendente.'
        );

        return;

    }


    try {

        const token =
            localStorage.getItem('token');


        await api.patch(
            `/atendimentos/${atendimentoId}/responsavel`,
            {
                assigned_user_id:
                    selectedUser
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );


        // Recarrega o Dashboard
        await loadStats();


        // Recarrega a fila
        const response =
            await api.get(
                '/dashboard/unassigned',
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        setUnassignedList(
            response.data
        );


        setSelectedUser('');


    } catch (error) {

        console.error(
            'Erro ao atribuir atendimento:',
            error
        );


        alert(
            error.response?.data?.error ||
            'Erro ao atribuir atendimento.'
        );

    }

}
    // =====================================================
    // CARREGAR AO ABRIR A PÁGINA
    // =====================================================

    useEffect(() => {

        loadStats();

    }, []);


    return (

        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                p: {
                    xs: 1.5,
                    sm: 2,
                    md: 3,
                    lg: 4
                },
                boxSizing: 'border-box',
                overflowX: 'hidden'
            }}
        >

            {/* =====================================================
                TÍTULO
            ===================================================== */}

            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontSize: {
                        xs: '1.75rem',
                        sm: '2rem',
                        md: '2.125rem'
                    }
                }}
            >
                Dashboard
            </Typography>


            {/* =====================================================
                BOAS-VINDAS
            ===================================================== */}

            <Box
                mb={4}
            >

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        fontSize: {
                            xs: '1.35rem',
                            sm: '1.5rem'
                        }
                    }}
                >
                    Olá, {user?.name}
                </Typography>


                <Typography
                    color="text.secondary"
                    mt={1}
                    sx={{
                        fontSize: {
                            xs: '0.9rem',
                            sm: '1rem'
                        }
                    }}
                >
                    Bem-vinda ao ConnectCRM.
                    Acompanhe seus indicadores em tempo real.
                </Typography>

            </Box>


            {/* =====================================================
                INDICADORES
            ===================================================== */}

            <Box
                sx={{
                    display: 'grid',

                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, minmax(0, 1fr))',
                        lg: 'repeat(4, minmax(0, 1fr))'
                    },

                    gap: {
                        xs: 1.5,
                        sm: 2,
                        md: 3
                    },

                    marginTop: {
                        xs: 2,
                        md: 4
                    },

                    width: '100%',
                    minWidth: 0
                }}
            >

                <DashboardCard
                    title="Contatos"
                    value={dashboard.contacts}
                    subtitle="Total de contatos"
                    icon={
                        <PeopleIcon
                            fontSize="large"
                        />
                    }
                />


                <DashboardCard
                    title="Novos"
                    value={dashboard.stats.novos}
                    subtitle="Novos atendimentos"
                    icon={
                        <TrendingUpIcon
                            fontSize="large"
                        />
                    }
                />


                <DashboardCard
                    title="Em atendimento"
                    value={dashboard.stats.andamento}
                    subtitle="Atendimentos ativos"
                    icon={
                        <ChatIcon
                            fontSize="large"
                        />
                    }
                />


                <DashboardCard
                    title="Propostas"
                    value={dashboard.stats.propostas}
                    subtitle="Em proposta"
                    icon={
                        <TrendingUpIcon
                            fontSize="large"
                        />
                    }
                />


                <DashboardCard
                    title="Negociação"
                    value={dashboard.stats.negociacoes}
                    subtitle="Em negociação"
                    icon={
                        <TrendingUpIcon
                            fontSize="large"
                        />
                    }
                />


                <DashboardCard
                    title="Aguardando cliente"
                    value={dashboard.stats.aguardando_cliente}
                    subtitle="Aguardando retorno"
                    icon={
                        <ChatIcon
                            fontSize="large"
                        />
                    }
                />


                <DashboardCard
                    title="Fechados"
                    value={dashboard.stats.fechados}
                    subtitle="Atendimentos concluídos"
                    icon={
                        <CheckCircleIcon
                            fontSize="large"
                        />
                    }
                />


                <DashboardCard
                    title="Perdidos"
                    value={dashboard.stats.perdidos}
                    subtitle="Não convertidos"
                    icon={
                        <CheckCircleIcon
                            fontSize="large"
                        />
                    }
                />

            </Box>
{/* =====================================================
    ATENDIMENTOS SEM RESPONSÁVEL
===================================================== */}

<Box
    sx={{
        mt: 4,
        cursor: 'pointer'
    }}
    onClick={loadUnassigned}
>
    <Paper
        sx={{
            p: {
                xs: 1.5,
                sm: 2.5
            },
            borderRadius: 3,
            display: 'flex',
            alignItems: {
                xs: 'flex-start',
                sm: 'center'
            },
            justifyContent: 'space-between',
            gap: 2,
            border: dashboard.unassigned > 0
                ? '1px solid #f59e0b'
                : '1px solid #e5e7eb'
        }}
    >

        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}
        >

            <WarningAmberIcon
                sx={{
                    color:
                        dashboard.unassigned > 0
                            ? '#f59e0b'
                            : '#94a3b8',
                    fontSize: 32
                }}
            />

            <Box sx={{ minWidth: 0 }}>
                <Typography
                    fontWeight="bold"
                    sx={{
                        fontSize: {
                            xs: '0.95rem',
                            sm: '1rem'
                        }
                    }}
                >
                    Atendimentos sem responsável
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: {
                            xs: '0.8rem',
                            sm: '0.875rem'
                        }
                    }}
                >
                    Atendimentos abertos aguardando distribuição
                </Typography>
            </Box>

        </Box>


        <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
                flexShrink: 0,
                fontSize: {
                    xs: '1.75rem',
                    sm: '2.125rem'
                },
                color:
                    dashboard.unassigned > 0
                        ? '#f59e0b'
                        : '#64748b'
            }}
        >
            {dashboard.unassigned}
        </Typography>

    </Paper>
</Box>
{/* =====================================================
    DIALOG - DISTRIBUIÇÃO DE ATENDIMENTOS
===================================================== */}

<Dialog
    open={openUnassigned}
    onClose={() => setOpenUnassigned(false)}
    fullWidth
    maxWidth="md"
    sx={{
        '& .MuiDialog-paper': {
            width: '100%',
            maxHeight: '90vh',
            m: {
                xs: 1,
                sm: 2
            }
        }
    }}
>

    <DialogTitle>
        Atendimentos aguardando distribuição
    </DialogTitle>


    <DialogContent>

        {unassignedList.length === 0 ? (

            <Typography
                color="text.secondary"
                sx={{ py: 3 }}
            >
                Não existem atendimentos aguardando distribuição.
            </Typography>

        ) : (

            unassignedList.map(
                (item) => (

                    <Paper
                        key={item.id}
                        sx={{
                            p: 2,
                            mb: 2,
                            borderRadius: 2
                        }}
                    >

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: {
                                    xs: 'stretch',
                                    sm: 'center'
                                },
                                flexDirection: {
                                    xs: 'column',
                                    sm: 'row'
                                },
                                gap: 2
                            }}
                        >

                            <Box>

                                <Typography
                                    fontWeight="bold"
                                >
                                    {item.contact_name}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {item.contact_phone}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 1,
                                        mt: 1,
                                        flexWrap: 'wrap'
                                    }}
                                >

                                    <Chip
                                        label={item.type}
                                        size="small"
                                    />

                                    {getStatusChip(
                                        item.status
                                    )}

                                    <Chip
                                        label={item.priority}
                                        size="small"
                                        variant="outlined"
                                    />

                                </Box>

                            </Box>


                            <TextField
                                select
                                label="Responsável"
                                value={selectedUser}
                                onChange={(event) =>
                                    setSelectedUser(
                                        event.target.value
                                    )
                                }
                                sx={{
                                    minWidth: {
                                        xs: '100%',
                                        sm: 220
                                    }
                                }}
                            >

                                <MenuItem value="">
                                    Selecionar atendente
                                </MenuItem>

                                {users.map(
                                    (user) => (

                                        <MenuItem
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.name}
                                        </MenuItem>

                                    )
                                )}

                            </TextField>
                            <Button
                                variant="contained"
                                onClick={() =>
                                    assignUser(item.id)
                                }
                                sx={{
                                    width: {
                                        xs: '100%',
                                        sm: 'auto'
                                    }
                                }}
                            >
                                    Atribuir
                                </Button>

                            </Box>

                    </Paper>

                )
            )

        )}

    </DialogContent>


    <DialogActions>

        <Button
            onClick={() =>
                setOpenUnassigned(false)
            }
        >
            Fechar
        </Button>

    </DialogActions>

</Dialog>
            {/* =====================================================
                DESEMPENHO DA EQUIPE
            ===================================================== */}

            <Paper
                sx={{
                    mt: {
                        xs: 3,
                        md: 5
                    },
                    p: {
                        xs: 1.5,
                        sm: 2,
                        md: 3
                    },
                    borderRadius: 3,
                    width: '100%',
                    boxSizing: 'border-box',
                    overflow: 'hidden'
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                >
                    Desempenho da equipe
                </Typography>


                <TableContainer
                    sx={{
                        width: '100%',
                        overflowX: 'auto',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >

                    <Table
                        sx={{
                            minWidth: 650
                        }}
                    >

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Atendente
                                </TableCell>

                                <TableCell align="center">
                                    Total
                                </TableCell>

                                <TableCell align="center">
                                    Em atendimento
                                </TableCell>

                                <TableCell align="center">
                                    Propostas
                                </TableCell>

                                <TableCell align="center">
                                    Negociação
                                </TableCell>

                                <TableCell align="center">
                                    Fechados
                                </TableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {dashboard.byUser.map(
                                (item) => (

                                    <TableRow
                                        key={item.user_id}
                                    >

                                        <TableCell>
                                            {item.user_name}
                                        </TableCell>

                                        <TableCell align="center">
                                            {item.total}
                                        </TableCell>

                                        <TableCell align="center">
                                            {item.andamento}
                                        </TableCell>

                                        <TableCell align="center">
                                            {item.propostas}
                                        </TableCell>

                                        <TableCell align="center">
                                            {item.negociacoes}
                                        </TableCell>

                                        <TableCell align="center">
                                            {item.fechados}
                                        </TableCell>

                                    </TableRow>

                                )
                            )}

                        </TableBody>

                    </Table>

                </TableContainer>

            </Paper>


            {/* =====================================================
                ATENDIMENTOS RECENTES
            ===================================================== */}

            <Paper
                sx={{
                    mt: {
                        xs: 2.5,
                        md: 4
                    },
                    p: {
                        xs: 1.5,
                        sm: 2,
                        md: 3
                    },
                    borderRadius: 3,
                    width: '100%',
                    boxSizing: 'border-box',
                    overflow: 'hidden'
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                >
                    Atendimentos recentes
                </Typography>


                <TableContainer
                    sx={{
                        width: '100%',
                        overflowX: 'auto',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >

                    <Table
                        sx={{
                            minWidth: 650
                        }}
                    >

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Cliente
                                </TableCell>

                                <TableCell>
                                    Tipo
                                </TableCell>

                                <TableCell>
                                    Responsável
                                </TableCell>

                                <TableCell>
                                    Status
                                </TableCell>

                                <TableCell>
                                    Prioridade
                                </TableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>

                            {dashboard.recent.map(
                                (item) => (

                                    <TableRow
                                        key={item.id}
                                    >

                                        <TableCell>
                                            {item.contact_name}
                                        </TableCell>

                                        <TableCell>
                                            {item.type}
                                        </TableCell>

                                        <TableCell>
                                            {
                                                item.assigned_user_name
                                                || 'Não atribuído'
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {getStatusChip(item.status)}
                                        </TableCell>

                                        <TableCell>
                                            {item.priority}
                                        </TableCell>

                                    </TableRow>

                                )
                            )}

                        </TableBody>

                    </Table>

                </TableContainer>

            </Paper>

        </Box>

    );

}


export default Dashboard;