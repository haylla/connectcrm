import {
    Box,
    Typography
} from '@mui/material';

import {
    Droppable
} from '@hello-pangea/dnd';

import KanbanCard from './KanbanCard';

function KanbanColumn({ stage }) {

    return (

        <Droppable
            droppableId={String(stage.id)}
        >

            {(provided) => (

                <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                        flex: 1,
                        minWidth: 250,
                        maxWidth: 290,
                        minHeight: 580,
                        backgroundColor: '#f8f9fc',
                        borderRadius: 3,
                        p: 2,
                        boxShadow: 2
                    }}
                >

                    {/* Cabeçalho da coluna */}

                    <Box
                        sx={{
                            backgroundColor: stage.color,
                            color: '#fff',
                            borderRadius: 2,
                            p: 1.5,
                            mb: 2
                        }}
                    >

                        <Typography
                            fontWeight="bold"
                        >
                            {stage.name}
                        </Typography>

                        <Typography
                            variant="body2"
                        >
                            {stage.contacts.length} contatos
                        </Typography>

                    </Box>

                    {/* Cards da coluna */}

                    {stage.contacts.map((contact, index) => (

                        <KanbanCard
                            key={contact.id}
                            contact={contact}
                            stage={stage}
                            index={index}
                        />

                    ))}

                    {provided.placeholder}

                </Box>

            )}

        </Droppable>

    );

}

export default KanbanColumn;