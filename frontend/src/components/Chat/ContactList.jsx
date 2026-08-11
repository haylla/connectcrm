import { useEffect, useState } from 'react';

import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    TextField,
    Typography,
    Avatar
} from '@mui/material';

import api from '../../services/api';

function ContactList({

    setSelectedContact,

    setSelectedConversation

}) {

    const [contacts, setContacts] = useState([]);

    // =====================================================
    // CARREGA TODOS OS CONTATOS
    // =====================================================
    async function loadContacts() {

        try {

            const response = await api.get('/contacts');

            setContacts(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    // =====================================================
    // ABRE UMA CONVERSA
    // -----------------------------------------------------
    // Busca uma conversa existente ou cria uma nova.
    // =====================================================
    async function openConversation(contact) {

        try {

            // Seleciona o contato
            setSelectedContact(contact);

            // Busca ou cria a conversa
            const response = await api.post(

                '/conversations',

                {

                    company_id: contact.company_id,

                    contact_id: contact.id

                }

            );

            // Salva a conversa selecionada
            setSelectedConversation(

                response.data

            );

        } catch (error) {

            console.error(error);

        }

    }

    // =====================================================
    // CARREGA OS CONTATOS AO ABRIR A TELA
    // =====================================================
    useEffect(() => {

        loadContacts();

    }, []);

    return (

        <Box
            sx={{
                width: 320,
                height: '100%',
                borderRight: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff'
            }}
        >

            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ p: 2 }}
            >
                Conversas
            </Typography>

            <Box
                sx={{
                    px: 2,
                    pb: 2
                }}
            >

                <TextField
                    fullWidth
                    size="small"
                    placeholder="Buscar contato..."
                />

            </Box>

            <List>

                {contacts.map((contact) => (

                    <ListItemButton
                        key={contact.id}
                        onClick={() => openConversation(contact)}
                    >

                        <Avatar
                            sx={{
                                mr: 2
                            }}
                        >

                            {contact.name.charAt(0).toUpperCase()}

                        </Avatar>

                        <ListItemText
                            primary={contact.name}
                            secondary="Clique para iniciar uma conversa"
                        />

                    </ListItemButton>

                ))}

            </List>

        </Box>

    );

}

export default ContactList;