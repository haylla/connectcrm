import {
    Box,
    Button,
    TextField
} from '@mui/material';

import { useState } from 'react';

import api from '../../services/api';

function ChatInput({

    selectedConversation,

    selectedContact

}) {

    const [message, setMessage] = useState('');

    // =====================================================
    // ENVIA UMA MENSAGEM
    // =====================================================
    async function sendMessage() {

        if (!selectedConversation || !selectedContact) {

            alert('Selecione uma conversa.');

            return;

        }

        if (!message.trim()) {

            return;

        }

        try {

            await api.post(

                '/messages',

                {

                    company_id: selectedContact.company_id,

                    contact_id: selectedContact.id,

                    sender: 'USER',

                    message: message

                }

            );

            setMessage('');

        } catch (error) {

            console.error(error);

        }

    }

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