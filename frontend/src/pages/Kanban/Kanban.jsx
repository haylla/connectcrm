import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import Sidebar from '../../components/Sidebar/Sidebar';
import api from '../../services/api';
import KanbanColumn from '../../components/Kanban/KanbanColumn';
import ContactDrawer from '../../components/ContactDrawer/ContactDrawer';
import {
    DragDropContext
} from '@hello-pangea/dnd';

function Kanban() {

    const [stages, setStages] = useState([]);
    
// =====================================================
// CONTACT DRAWER
// -----------------------------------------------------
// Controla o painel lateral do contato selecionado.
// =====================================================
const [selectedContact, setSelectedContact] = useState(null);

const [drawerOpen, setDrawerOpen] = useState(false);
    // Carrega o Pipeline apenas uma vez quando a tela é aberta.
    useEffect(() => {

        loadPipeline();

    }, []);

    // Busca todas as etapas e seus respectivos contatos.
    async function loadPipeline() {

        try {

            const response =
                await api.get('/pipeline');

            setStages(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    // =====================================================
    // DRAG & DROP
    // =====================================================
    // Esta função será chamada automaticamente sempre que
    // um cartão for arrastado e solto em outra coluna.
    //
    // PUT /api/pipeline/contact/:id
    //
    // 4 - Atualizar o Kanban automaticamente.
    // =====================================================
    async function handleDragEnd(result) {

    // Se o usuário soltou fora de uma coluna,
    // não fazemos nada.
    if (!result.destination) {
        return;
    }

    const contactId = result.draggableId;

    const stageId = Number(
        result.destination.droppableId
    );

    console.log('========================');
    console.log('Contato:', contactId);
    console.log('Novo estágio:', stageId);
    console.log('========================');

    try {

        await api.put(

            `/pipeline/contact/${contactId}`,

            {
                stage_id: stageId
            }

        );

        // Atualiza o Kanban após salvar no banco.
        await loadPipeline();

    } catch (error) {

        console.error(error);

    }

}
// =====================================================
// CONTACT DRAWER
// =====================================================

// Abre o painel lateral.
function openContact(contact) {

    setSelectedContact(contact);

    setDrawerOpen(true);

}

// Fecha o painel lateral.
function closeContact() {

    setDrawerOpen(false);

    setSelectedContact(null);

}
    return (

        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                backgroundColor: '#f5f5f5'
            }}
        >



            <Box
                sx={{
                    flex: 1,
                    px:2,
                    py:3
                }}
            >

                <Box mb={4}>

    <Typography
        variant="h3"
        fontWeight="bold"
    >
        Pipeline de Vendas
    </Typography>

    <Typography
        color="text.secondary"
        mt={1}
    >
        Gerencie seus clientes através de um funil visual de vendas.
    </Typography>

</Box>

<DragDropContext
    onDragEnd={handleDragEnd}
>
<Box
    sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    }}
    
>
    {stages.map(stage => (

        <KanbanColumn
            key={stage.id}
            stage={stage}
        />

    ))}

</Box>
</DragDropContext>
<ContactDrawer
    open={drawerOpen}
    onClose={closeContact}
    contact={selectedContact}
/>
            </Box>

        </Box>

    );

}

export default Kanban;