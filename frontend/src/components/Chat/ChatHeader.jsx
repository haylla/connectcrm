import {
    Box,
    Typography,
    Avatar,
    Button,
    Chip
} from '@mui/material';

import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonIcon from '@mui/icons-material/Person';

import api from '../../services/api';

function ChatHeader({
    selectedContact,
    selectedConversation,
    onConversationUpdated
}) {

    if (!selectedContact) {

        return (

            <Box
                sx={{
                    minHeight: 76,
                    display: 'flex',
                    alignItems: 'center',
                    px: 3,
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: '#fff'
                }}
            >

                <Typography color="text.secondary">
                    Selecione um contato
                </Typography>

            </Box>

        );

    }

    // =====================================================
    // STATUS DA CONVERSA
    // =====================================================

    const isHuman =
        selectedConversation?.status === 'HUMAN';

    const isClosed =
        selectedConversation?.status === 'CLOSED';

    // =====================================================
    // ALTERAR STATUS DA CONVERSA
    // =====================================================

    const handleStatusChange = async (status) => {

        if (!selectedConversation?.id) {
            return;
        }

        try {

            const response = await api.patch(
                `/conversations/${selectedConversation.id}/status`,
                {
                    status
                }
            );

            // Atualiza a conversa selecionada
            // com o retorno real do backend
            if (onConversationUpdated) {

                onConversationUpdated(
                    response.data
                );

            }

        } catch (error) {

            console.error(
                'Erro ao alterar status da conversa:',
                error
            );

            alert(
                'Não foi possível alterar o status da conversa.'
            );

        }

    };

    return (

        <Box
            sx={{
                minHeight: 76,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #e0e0e0',
                px: 3,
                backgroundColor: '#fff'
            }}
        >

            {/* ============================================= */}
            {/* CONTATO                                       */}
            {/* ============================================= */}

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >

                <Avatar
                    sx={{
                        width: 48,
                        height: 48,
                        mr: 2
                    }}
                >
                    {selectedContact.name
                        ?.charAt(0)
                        .toUpperCase()}
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

                </Box>

            </Box>

            {/* ============================================= */}
            {/* CONTROLE DO ATENDIMENTO                       */}
            {/* ============================================= */}

            {selectedConversation && (

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}
                >

                    {isClosed ? (

                        <Chip
                            label="Conversa encerrada"
                            variant="outlined"
                        />

                    ) : isHuman ? (

                        <>
                            <Chip
                                icon={<PersonIcon />}
                                label="Atendimento humano"
                                color="warning"
                                variant="outlined"
                            />

                            <Button
                                variant="outlined"
                                startIcon={
                                    <SmartToyOutlinedIcon />
                                }
                                onClick={() =>
                                    handleStatusChange('BOT')
                                }
                            >
                                Devolver para IA
                            </Button>
                        </>

                    ) : (

                        <>
                            <Chip
                                icon={
                                    <SmartToyOutlinedIcon />
                                }
                                label="IA atendendo"
                                color="success"
                                variant="outlined"
                            />

                            <Button
                                variant="contained"
                                startIcon={
                                    <PersonIcon />
                                }
                                onClick={() =>
                                    handleStatusChange('HUMAN')
                                }
                            >
                                Assumir atendimento
                            </Button>
                        </>

                    )}

                </Box>

            )}

        </Box>

    );

}

export default ChatHeader;