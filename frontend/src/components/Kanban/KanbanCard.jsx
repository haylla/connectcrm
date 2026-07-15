import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Typography
} from '@mui/material';

import {
    Draggable
} from '@hello-pangea/dnd';

function KanbanCard({ contact, stage, index }) {

    return (

        <Draggable
            draggableId={String(contact.id)}
            index={index}
        >

            {(provided) => (

                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                        mb: 2,
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: '.2s',
                        border: '1px solid #E2E8F0',

                        '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: 5
                        }
                    }}
                >

                    <CardContent
                        sx={{
                            p: 2,
                            '&:last-child': {
                                pb: 2
                            }
                        }}
                    >

                        <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                        >

                            <Avatar
                                sx={{
                                    bgcolor: stage.color,
                                    width: 42,
                                    height: 42,
                                    fontWeight: 'bold'
                                }}
                            >
                                {contact.name.charAt(0)}
                            </Avatar>

                            <Box>

                                <Typography fontWeight="bold">
                                    {contact.name}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {contact.phone}
                                </Typography>

                            </Box>

                        </Box>

                        <Box mt={2}>

                            <Chip
                                label={stage.name}
                                size="small"
                                color="primary"
                                sx={{
                                    fontWeight: 'bold',
                                    borderRadius: 2
                                }}
                            />

                        </Box>

                    </CardContent>

                </Card>

            )}

        </Draggable>

    );

}

export default KanbanCard;