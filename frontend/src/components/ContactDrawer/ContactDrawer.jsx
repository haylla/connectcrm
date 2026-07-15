import {
    Drawer,
    Box,
    Typography,
    Divider,
    IconButton
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

function ContactDrawer({

    open,
    onClose,
    contact

}) {

    if (!contact) return null;

    return (

        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >

            <Box
                sx={{
                    width: 380,
                    p: 3
                }}
            >

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                    >
                        {contact.name}
                    </Typography>

                    <IconButton
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>

                </Box>

                <Divider sx={{ mb: 3 }} />

                <Typography
                    fontWeight="bold"
                    gutterBottom
                >
                    📱 Telefone
                </Typography>

                <Typography mb={3}>
                    {contact.phone}
                </Typography>

                <Typography
                    fontWeight="bold"
                    gutterBottom
                >
                    ✉ E-mail
                </Typography>

                <Typography mb={3}>
                    {contact.email}
                </Typography>

                <Typography
                    fontWeight="bold"
                    gutterBottom
                >
                    📌 Etapa
                </Typography>

                <Typography>
                    {contact.stage_name}
                </Typography>

            </Box>

        </Drawer>

    );

}

export default ContactDrawer;