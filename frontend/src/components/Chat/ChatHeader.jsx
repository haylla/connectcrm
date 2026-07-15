import {
    Box,
    Typography,
    Avatar
} from '@mui/material';

function ChatHeader({ selectedContact }) {

    if (!selectedContact) {

        return (

            <Box
                sx={{
                    height: 70,
                    display: 'flex',
                    alignItems: 'center',
                    px: 3,
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: '#fff'
                }}
            >

                <Typography
                    color="text.secondary"
                >
                    Selecione um contato
                </Typography>

            </Box>

        );

    }

    return (

        <Box
            sx={{
                height: 70,
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #e0e0e0',
                px: 3,
                backgroundColor: '#fff'
            }}
        >

            <Avatar
                sx={{
                    width: 48,
                    height: 48,
                    mr: 2
                }}
            >
                {selectedContact.name.charAt(0).toUpperCase()}
            </Avatar>

            <Box>

                <Typography fontWeight="bold">

                    {selectedContact.name}

                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >

                    📱 {selectedContact.phone}

                </Typography>

                <Typography
                    variant="body2"
                    color="success.main"
                >

                    ● Em atendimento

                </Typography>

            </Box>

        </Box>

    );

}

export default ChatHeader;