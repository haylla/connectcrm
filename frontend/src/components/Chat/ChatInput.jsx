import {
    Box,
    Button,
    TextField
} from '@mui/material';
import { useState } from 'react';
import api from '../../services/api';

function ChatInput({ selectedContact }) {
async function sendMessage() {

    if (!selectedContact) {

    alert('Selecione um contato.');

    return;

}

    if (!message.trim()) return;

    try {

        await api.post ('/messages', {

            contact_id: selectedContact.id,
            sender: 'agent',
            message: message

        });
        setMessage('');
         window.location.reload();

    } catch (error) {

        console.error(error);

    }

}

    const [message, setMessage] = useState('');
    return (

        <Box
            sx={{
                p: 2,
                display: 'flex',
                gap: 2,
                borderTop: '1px solid #ddd',
                backgroundColor: '#fff'
            }}
        >

           <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite uma mensagem..."
        />
            <Button
            variant="contained"
            onClick={sendMessage}
        >

                Enviar

            </Button>

        </Box>

    );

}

export default ChatInput;