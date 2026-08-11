import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import api from '../../services/api';

function ChatBody({ selectedConversation }) {

    const [messages, setMessages] = useState([]);

    // =====================================================
    // REFERÊNCIA PARA O FINAL DA CONVERSA
    // =====================================================
    const messagesEndRef = useRef(null);

    // =====================================================
    // ROLA O CHAT PARA O FINAL
    // =====================================================
    function scrollToBottom() {

        messagesEndRef.current?.scrollIntoView({

            behavior: 'smooth'

        });

    }

    // =====================================================
    // CARREGA AS MENSAGENS DA CONVERSA
    // =====================================================
    async function loadMessages() {

        try {

            const response = await api.get(

                `/messages/conversation/${selectedConversation.id}`

            );

            setMessages(response.data);

            setTimeout(() => {

                scrollToBottom();

            }, 100);

        } catch (error) {

            console.error(error);

        }

    }

    // =====================================================
    // ATUALIZA AS MENSAGENS AUTOMATICAMENTE
    // =====================================================
    useEffect(() => {

        if (!selectedConversation) {

            setMessages([]);

            return;

        }

        loadMessages();

        const interval = setInterval(() => {

            loadMessages();

        }, 2000);

        return () => clearInterval(interval);

    }, [selectedConversation]);

    // =====================================================
    // NENHUMA CONVERSA SELECIONADA
    // =====================================================
    if (!selectedConversation) {

        return (

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >

                <Typography variant="h6">

                    💬 Selecione um contato

                </Typography>

                <Typography color="text.secondary">

                    As mensagens aparecerão aqui.

                </Typography>

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
                            message.sender === 'USER'
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
                                message.sender === 'CLIENT'
                                    ? '#ffffff'
                                    : message.sender === 'AI'
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

                            {new Date(message.created_at).toLocaleTimeString(
                                'pt-BR',
                                {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }
                            )}

                        </Typography>

                    </Paper>

                </Box>

            ))}

            <div ref={messagesEndRef}></div>

        </Box>

    );

}

export default ChatBody;