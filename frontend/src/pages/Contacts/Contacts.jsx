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

        <Box sx={{ display: 'flex' }}>

            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    padding: 4
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Contatos
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    sx={{ mb: 3 }}
                >
                    + Novo Contato
                </Button>

                <Card>

                    <CardContent>

                        <Table>

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
                                            {contact.name}
                                        </TableCell>

                                        <TableCell>
                                            {contact.phone}
                                        </TableCell>

                                        <TableCell>
                                            {contact.email}
                                        </TableCell>

                                        <TableCell align="center">

                                            <IconButton color="primary">
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton
                                                color="success"
                                                onClick={() => {

                                                    setSelectedContact(contact);

                                                    setChatOpen(true);

                                                }}
                                            >
                                                <ChatIcon />
                                            </IconButton>

                                            <IconButton color="error">
                                                <DeleteIcon />
                                            </IconButton>

                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </CardContent>

                </Card>

                <Dialog
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

        </Box>

    );

}

export default Contacts;