import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

import {
    Box,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton
} from '@mui/material';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatIcon from '@mui/icons-material/Chat';

import Sidebar from '../../components/Sidebar/Sidebar';
import api from '../../services/api';

function Contacts() {

    const [contacts, setContacts] = useState([]);

    const [open, setOpen] = useState(false);

    const [chatOpen, setChatOpen] = useState(false);

    const [selectedContact, setSelectedContact] = useState(null);

    const [name, setName] = useState('');

    const [phone, setPhone] = useState('');

    const [email, setEmail] = useState('');

    const [message, setMessage] = useState('');

    async function loadContacts() {

        try {

            const response = await api.get('/contacts');

            setContacts(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadContacts();

    }, []);

    async function createContact() {

        try {

            await api.post('/contacts', {
                company_id: 1,
                name,
                phone,
                email
            });

            setOpen(false);

            setName('');
            setPhone('');
            setEmail('');

            loadContacts();

        } catch (error) {

            console.error(error);

        }

    }
async function sendWhatsAppMessage() {

    if (!selectedContact) {
        alert('Nenhum contato selecionado.');
        return;
    }

    try {

        const response = await api.post('/whatsapp/send', {
            number: selectedContact.phone,
            text: message
        });

        console.log(response.data);

        setMessage('');

        alert('Mensagem enviada!');

    } catch (error) {

        console.error(error);

        console.log(error.response);

        console.log(error.response?.data);

        alert('Erro ao enviar mensagem.');

    }

}
    return (

        
         <Box
        sx={{
            width: '100%',
            minHeight: '100vh',
            p: 4,
            boxSizing: 'border-box'
        }}
            >

                <Box
    sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4
    }}
>
    <Box>

        <Typography variant="h4" fontWeight="bold">

         Contatos

        </Typography>

        <Typography color="text.secondary">

            Centralize seus clientes e inicie atendimentos pelo WhatsApp.

        </Typography>

    </Box>

<Button
    variant="contained"
    size="large"
    startIcon={<AddIcon />}
    onClick={() => setOpen(true)}
    sx={{
        height: 52,
        borderRadius: 3,
        px: 3,
        fontWeight: 'bold',
        textTransform: 'none'
    }}
>
    Novo Contato
</Button>
<Grid
    container
    spacing={2}
    sx={{ mb: 4 }}
>

    <Grid size={{ xs: 12, md: 4 }}>

           <Card
    sx={{
        borderRadius: 4,
        boxShadow: 3,
        textAlign: 'center',
        height: '100%'
    }}
    >

            <CardContent>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    
                >

                    {contacts.length}

                </Typography>

                <Typography color="text.secondary">

                    Total de Contatos

                </Typography>

            </CardContent>

        </Card>

    </Grid>

    <Grid size={{ xs: 12, md: 4 }}>

        <Card
    sx={{
        borderRadius: 4,
        boxShadow: 3,
        textAlign: 'center',
        height: '100%'
    }}
>

            <CardContent>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >

                    {
                        contacts.filter(
                            c => c.status === 'LEAD'
                        ).length
                    }

                </Typography>

                <Typography color="text.secondary">

                    Leads

                </Typography>

            </CardContent>

        </Card>

    </Grid>

    <Grid size={{ xs: 12, md: 4 }}>

        <Card
    sx={{
        borderRadius: 4,
        boxShadow: 3
    }}
>

            <CardContent>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >

                    💬

                </Typography>

                <Typography color="text.secondary">

                    WhatsApp Integrado

                </Typography>

            </CardContent>

        </Card>

    </Grid>

</Grid>
</Box>

                <Card>

                    <CardContent>

                        <Table
    sx={{
        '& th': {
            fontWeight: 'bold',
            backgroundColor: '#fafafa'
        },
        '& tbody tr:hover': {
            backgroundColor: '#f8fbff'
        }
    }}
>

                            <TableHead>

                                <TableRow>

                                    <TableCell>Nome</TableCell>
                                    <TableCell>Telefone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell align="center">
                                        Ações
                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {contacts.map((contact) => (

                                    <TableRow key={contact.id}>

                                       <TableCell>

                                        <Typography fontWeight="bold">

                                            {contact.name}

                                        </Typography>

                                       </TableCell>

                                        <TableCell>
                                            {contact.phone}
                                        </TableCell>

                                        <TableCell>
                                            {contact.email}
                                        </TableCell>
<TableCell
    align="center"
    sx={{
        width: 140
    }}
>

    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1
        }}
    >

        <IconButton
            color="primary"
            sx={{
                '&:hover': {
                    transform: 'scale(1.15)'
                }
            }}
        >
            <EditIcon />
        </IconButton>

        <IconButton
            color="success"
            onClick={() => {

                setSelectedContact(contact);

                setChatOpen(true);

            }}
            sx={{
                '&:hover': {
                    transform: 'scale(1.15)'
                }
            }}
        >
            <ChatIcon />
        </IconButton>

        <IconButton
            color="error"
            sx={{
                '&:hover': {
                    transform: 'scale(1.15)'
                }
            }}
        >
            <DeleteIcon />
        </IconButton>

    </Box>

</TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </CardContent>

                </Card>

                <Dialog
                PaperProps={{
                    sx: {
                        borderRadius: 4
                    }
                }}
                    open={open}
                    onClose={() => setOpen(false)}
                >

                    <DialogTitle>
                        Novo Contato
                    </DialogTitle>

                    <DialogContent>

                        <TextField
                            label="Nome"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextField
                            label="Telefone"
                            fullWidth
                            margin="normal"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </DialogContent>

                    <DialogActions>

                        <Button
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="contained"
                            onClick={createContact}
                        >
                            Salvar
                        </Button>

                    </DialogActions>

                </Dialog>

                <Dialog
                    PaperProps={{
                        sx: {
                            borderRadius: 4
                        }
                    }}      
                    open={chatOpen}
                    onClose={() => setChatOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >

                    <DialogTitle>

                        {selectedContact?.name}

                    </DialogTitle>

                    <DialogContent>

                        <Typography>

                            <strong>Telefone:</strong> {selectedContact?.phone}

                        </Typography>

                        <Box sx={{ mt: 3 }}>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Digite sua mensagem"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />

                        </Box>


                    </DialogContent>

                    <DialogActions>

                       <Button
                        onClick={() => setChatOpen(false)}
                    >
                        Fechar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={sendWhatsAppMessage}
                        disabled={!message.trim()}
                    >
                        Enviar
                    </Button>

                    </DialogActions>

                </Dialog>

            </Box>

    );

}

export default Contacts;