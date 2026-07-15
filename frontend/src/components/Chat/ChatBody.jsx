import { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import api from '../../services/api';

function ChatBody({ selectedContact }) {

const [messages, setMessages] = useState([]);

useEffect(() => {

    loadMessages();

}, [selectedContact]);

async function loadMessages() {

    if (!selectedContact) return;

    const response = await api.get(
        `/messages/${selectedContact.id}`
    );

    setMessages(response.data);

}

    if (!selectedContact) {

    return (

        <Box
            sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >

            Selecione uma conversa.

        </Box>

    );

}
    return (

        <Box
            sx={{
                flex: 1,
                p: 3,
                overflowY: 'auto',
                backgroundColor: '#f5f5f5'
            }}
        >

            {messages.map((message) => (

                <Box
                    key={message.id}
                    sx={{
                        display: 'flex',
                        justifyContent:
                            message.sender === 'agent'
                                ? 'flex-end'
                                : 'flex-start',
                        mb: 2
                    }}
                >

                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            maxWidth: '70%',
                            backgroundColor:
                                message.sender === 'client'
                                    ? '#ffffff'
                                    : message.sender === 'ai'
                                    ? '#e3f2fd'
                                    : '#dcf8c6'
                        }}
                    >

                        <Typography>

                            {message.message}

                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: 'block',
                                mt: 1,
                                textAlign: 'right'
                            }}
                        >

                            {new Date(message.created_at).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                            })}

                        </Typography>

                    </Paper>

                </Box>

            ))}

        </Box>

    );

}

export default ChatBody;