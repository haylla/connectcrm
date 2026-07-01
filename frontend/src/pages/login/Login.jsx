import { useState } from 'react';
import api from '../../services/api';

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
        <div
            style={{
                width: '300px',
                margin: '100px auto'
            }}
        >
            <h1>ConnectCRM</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <br />
            <br />

            <button onClick={handleLogin}>
                Entrar
            </button>

        </div>
    );
}

export default Login;

