import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem
} from "@mui/material";

import { useState } from "react";


function UserModal({

    open,

    onClose,

    onSave,

    user

}) {

    const [formData, setFormData] = useState({

        company_id: 1,

        name: "",

        email: "",

        password: "",

        role: "ADMIN",

        status: "ACTIVE"

    });

    function handleChange(event) {

        setFormData({

            ...user,

            [event.target.name]: event.target.value

        });

    }

    function handleSave() {

        onSave(user);

    }

    return (

        <Dialog

            open={open}

            onClose={onClose}

            maxWidth="sm"

            fullWidth

        >

            <DialogTitle>

                Novo Usuário

            </DialogTitle>

            <DialogContent>

                <TextField

                    margin="normal"

                    fullWidth

                    label="Nome"

                    name="name"

                    value={formData.name}

                    onChange={handleChange}

                />

                <TextField

                    margin="normal"

                    fullWidth

                    label="Email"

                    name="email"

                    value={formData.email}

                    onChange={handleChange}

                />

                <TextField

                    margin="normal"

                    fullWidth

                    label="Senha"

                    type="password"

                    name="password"

                    value={formData.password}

                    onChange={handleChange}

                />

                <TextField

                    margin="normal"

                    fullWidth

                    select

                    label="Perfil"

                    name="role"

                    value={formData.role}

                    onChange={handleChange}

                >

                    <MenuItem value="ADMIN">

                        Administrador

                    </MenuItem>

                    <MenuItem value="SUPERVISOR">

                        Supervisor

                    </MenuItem>

                    <MenuItem value="AGENT">

                        Agente

                    </MenuItem>

                </TextField>

                <TextField

                    margin="normal"

                    fullWidth

                    select

                    label="Status"

                    name="status"

                    value={formData.status}

                    onChange={handleChange}

                >

                    <MenuItem value="ACTIVE">

                        Ativo

                    </MenuItem>

                    <MenuItem value="INACTIVE">

                        Inativo

                    </MenuItem>

                </TextField>

            </DialogContent>

            <DialogActions>

                <Button

                    onClick={onClose}

                >

                    Cancelar

                </Button>

                <Button

                    variant="contained"

                    onClick={handleSave}

                >

                    Salvar

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default UserModal;