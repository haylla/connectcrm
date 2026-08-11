import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CampaignIcon from '@mui/icons-material/Campaign';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';

function Sidebar() {
const [collapsed, setCollapsed] = useState(false);
    return (
        <Drawer
            variant="permanent"
           sx={{
                width: collapsed ? 80 : 240,
                flexShrink: 0,

            '& .MuiDrawer-paper': {
                width: collapsed ? 80 : 240,
                backgroundColor: '#1E293B',
                color: '#FFFFFF',
                borderRight: 'none',
                boxSizing: 'border-box'
    }
}}
        >
<Box
    sx={{
        display: 'flex',
        justifyContent:'flex-start'
        ,
        alignItems: 'center',
        p: 2
    }}
>

{!collapsed && (

<Typography
    variant="h6"
    fontWeight="bold"
>
    ConnectCRM
</Typography>
    )}
 <IconButton
        onClick={() => setCollapsed(!collapsed)}
        sx={{ color: '#fff' }}
    >
    <MenuIcon />

</IconButton>
    
</Box>
            <List>

                <ListItemButton
                component={Link}
                to="/dashboard"
                sx={{
                mx: 1,
                my: .5,
                borderRadius: 2,

                '&:hover': {
                    backgroundColor: '#334155'
    }
}}
            >   
                <DashboardIcon sx={{mr: 2,color:'#90CAF9'}} />

{!collapsed && (

    <ListItemText
        primary="Dashboard"
    />

)}
                </ListItemButton>

               <ListItemButton
                    component={Link}
                    to="/contacts"
                                   sx={{
                mx: 1,
                my: .5,
                borderRadius: 2,

                '&:hover': {
                    backgroundColor: '#334155'
    }
}}
                >
                    <PeopleIcon sx={{mr: 2,color:'#90CAF9'}} />

                   {!collapsed && (
                    <ListItemText
                        primary="Contatos"
                    />
                )}
                </ListItemButton>
                <ListItemButton
                component={Link}
                to="/conversations"
                               sx={{
                mx: 1,
                my: .5,
                borderRadius: 2,

                '&:hover': {
                    backgroundColor: '#334155'
    }
}}
            >
                <ChatIcon sx={{mr: 2,color:'#90CAF9'}} />

                {!collapsed && (
                <ListItemText primary="Conversas"/>
                )}
                </ListItemButton>

               <ListItemButton
    component={Link}
    to="/kanban"
    sx={{
        mx: 1,
        my: .5,
        borderRadius: 2,
        '&:hover': {
            backgroundColor: '#334155'
        }
    }}
>

    <ViewKanbanIcon
        sx={{
            mr:2,
            color:'#90CAF9'
        }}
    />

    {!collapsed && (
        <ListItemText primary="Kanban" />
    )}

</ListItemButton>

                <ListItemButton
    component={Link}
    to="/users"
    sx={{
        mx: 1,
        my: .5,
        borderRadius: 2,
        '&:hover': {
            backgroundColor: '#334155'
        }
    }}
>

    <PersonIcon
        sx={{
            mr: 2,
            color: '#90CAF9'
        }}
    />

    {!collapsed && (
        <ListItemText primary="Usuários" />
    )}

</ListItemButton>

            </List>
<Typography
    variant="caption"
    sx={{
        mt: 'auto',
        p: 2,
        textAlign: 'center',
        color: '#94A3B8'
    }}
>

    ConnectCRM v1.0

</Typography>
        </Drawer>
    );

}

export default Sidebar;
