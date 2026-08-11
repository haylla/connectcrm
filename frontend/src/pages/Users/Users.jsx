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

    try {

        await api.post(

            "/users",

            user

        );

        setOpenModal(false);

        loadUsers();

    } catch (error) {

        console.error(error);

    }
}
const [selectedUser, setSelectedUser] = useState(null);

              function editUser(user){

    console.log(user);

    setSelectedUser(user);

    setOpenModal(true);

}
    return (

        <Box
            sx={{
                display: 'flex',
                height: '100vh'
            }}
        >

            <Sidebar />

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

                                            <IconButton color="error">

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
