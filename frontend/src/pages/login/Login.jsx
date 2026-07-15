import ChatIcon from '@mui/icons-material/Chat';
import { useState } from 'react';
import api from '../../services/api';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button
} from '@mui/material';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {

        try {

           const response = await api.post(
    '/auth/login',
    {
        email,
        password
    }
);

localStorage.setItem(
    'token',
    response.data.token
);

localStorage.setItem(
    'user',
    JSON.stringify(response.data.user)
);

window.location.href = '/dashboard';

            console.log(response.data);

        } catch (error) {

            alert(
                error.response?.data?.error ||
                'Erro ao fazer login'
            );

        }

    }

return (

    <Box
        sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f7fb'
        }}
    >

        <Paper
            elevation={4}
            sx={{
                width: 420,
                padding: 5,
                borderRadius: 4
            }}
        >

            <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    gap={1}
    mb={3}
>

    <ChatIcon
        sx={{
            fontSize: 42,
            color: '#1976d2'
        }}
    />

    <Typography
        variant="h4"
        fontWeight="bold"
    >
        ConnectCRM
    </Typography>

</Box>

            <Typography
                align="center"
                color="text.secondary"
                mb={4}
            >
                Centralize seus clientes, conversas e atendimentos em um único lugar.
            </Typography>

            <TextField
                label="E-mail"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <TextField
                label="Senha"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                mt:3,
                height:52,
                borderRadius:30
            }}
                onClick={handleLogin}
            >
                Entrar
            </Button>

            <Typography
                variant="caption"
                display="block"
                align="center"
                sx={{
                    mt: 4,
                    color: 'text.secondary'
                }}
            >
                Versão Demonstrativa • ConnectCRM
            </Typography>

        </Paper>

    </Box>

);
}

export default Login;

