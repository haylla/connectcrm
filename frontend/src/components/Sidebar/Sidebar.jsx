import { Link } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';

function Sidebar() {

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                '& .MuiDrawer-paper': {
                    width: 240
                }
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    padding: 2,
                    fontWeight: 'bold'
                }}
            >
                ConnectCRM
            </Typography>

            <List>

                <ListItemButton selected>
                    <ListItemText
                        primary="Dashboard"
                    />
                </ListItemButton>

               <ListItemButton
                    component={Link}
                     to="/contacts"
                >
                <ListItemText
                primary="Contatos"
                />
                </ListItemButton>

                <ListItemButton>
                    <ListItemText
                        primary="Kanban"
                    />
                </ListItemButton>

                <ListItemButton>
                    <ListItemText
                        primary="Campanhas"
                    />
                </ListItemButton>

                <ListItemButton>
                    <ListItemText
                        primary="Logout"
                    />
                </ListItemButton>

            </List>

        </Drawer>
    );

}

export default Sidebar;
