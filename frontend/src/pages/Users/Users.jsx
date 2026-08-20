import { useEffect, useState } from 'react';

import Sidebar from '../../components/Sidebar/Sidebar';
import UserModal from "../../components/Users/UserModal";
import api from '../../services/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

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
    Button
} from '@mui/material';

function Users() {

    const [users, setUsers] = useState([]);

    // =====================================================
    // CARREGAR USUÁRIOS
    // =====================================================
    async function loadUsers() {

        try {

            const response = await api.get('/users');

            setUsers(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadUsers();

    }, []);
 
    const [openModal, setOpenModal] = useState(false);
async function saveUser(user) {

    console.log("USUÁRIO ENVIADO:", user);

    try {

        if (user.id) {

            console.log("EDITANDO:", user.id);

            const response = await api.put(
                `/users/${user.id}`,
                user
            );

            console.log("RESPOSTA PUT:", response.data);

        } else {

            console.log("CRIANDO");

            await api.post(
                "/users",
                user
            );

        }

        setOpenModal(false);

        setSelectedUser(null);

        loadUsers();

    } catch (error) {

        console.error("ERRO AO SALVAR:", error);
        console.error("RESPOSTA DO SERVIDOR:", error.response?.data);

    }

}
/*async function saveUser(user) {

    try {

        if (user.id) {

            await api.put(
                `/users/${user.id}`,
                user
            );

        } else {

            await api.post(
                "/users",
                user
            );

        }

        setOpenModal(false);

        setSelectedUser(null);

        loadUsers();

    } catch (error) {

        console.error(error);

    }

}*/

const [selectedUser, setSelectedUser] = useState(null);

              function editUser(user){

    console.log(user);

    setSelectedUser(user);

    setOpenModal(true);

}
async function deleteUser(id) {

    const confirmed = window.confirm(
        'Tem certeza que deseja excluir este usuário?'
    );

    if (!confirmed) {

        return;

    }

    try {

        await api.delete(
            `/users/${id}`
        );

        loadUsers();

    } catch (error) {

        console.error(
            'Erro ao excluir usuário:',
            error
        );

    }

}
    return (

        <Box
            sx={{
                display: 'flex',
                height: '100vh'
            }}
        >

            <Box
                sx={{
                    flex: 1,
                    p: 4
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                    }}
                >

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        Usuários
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => setOpenModal(true)}
                    >
                        + Novo Usuário
                    </Button>

                </Box>

                <TableContainer
                    component={Paper}
                >

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>Nome</TableCell>

                                <TableCell>Email</TableCell>
                                    
                                <TableCell>Perfil</TableCell>

                                <TableCell>Status</TableCell>

                                <TableCell>Criado em</TableCell>

                                <TableCell>Ações</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {users.map(user => (

                                <TableRow key={user.id}>

                                    <TableCell>

                                        {user.name}

                                    </TableCell>

                                    <TableCell>

                                        {user.email}

                                    </TableCell>
                                            <TableCell>

                                            {user.role === 'ADMIN'
                                                ? 'Administrador'
                                                : user.role === 'SUPERVISOR'
                                                    ? 'Supervisor'
                                                    : 'Agente'
                                            }

                                        </TableCell>

                                        <TableCell>

                                            {user.status === 'ACTIVE'
                                                ? 'Ativo'
                                                : 'Inativo'
                                            }

                                        </TableCell>
                                        <TableCell>

                                        {

                                            new Date(

                                                user.created_at

                                            ).toLocaleDateString(

                                                'pt-BR'

                                            )

                                        }

                                    </TableCell>
                                        <TableCell>

                                            <IconButton
                                                onClick={() => editUser(user)}
                                            >

                                                <EditIcon />

                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                onClick={() => deleteUser(user.id)}
                                            >

                                                <DeleteIcon />

                                            </IconButton>

                                        </TableCell>
                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </TableContainer>
                 <UserModal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedUser(null);
                    }}
                    onSave={saveUser}
                    user={selectedUser}
                />
            </Box>

        </Box>

    );

}

export default Users;
