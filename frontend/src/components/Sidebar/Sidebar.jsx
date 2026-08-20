import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

import Avatar from '@mui/material/Avatar';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import {
    Box,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';


function Sidebar() {

    const [collapsed, setCollapsed] = useState(false);

    const sidebarWidth = collapsed ? 80 : 240;

    const user = JSON.parse(
        localStorage.getItem('user')
    );
    const isAdmin = user?.role === 'ADMIN';

    const isSupervisor =
        user?.role === 'SUPERVISOR';

    const isAgent =
        user?.role === 'AGENT';
        


    function handleLogout() {

        localStorage.removeItem('token');

        localStorage.removeItem('user');

        window.location.href = '/';

    }


    return (

        <Box
            component="aside"
            sx={{
                width: sidebarWidth,
                minWidth: sidebarWidth,
                height: '100vh',
                backgroundColor: '#1E293B',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                transition: 'width 0.2s ease'
            }}
        >

            {/* =====================================================
                CABEÇALHO
            ===================================================== */}

            <Box
                sx={{
                    height: 70,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed
                        ? 'center'
                        : 'space-between',
                    px: 2,
                    boxSizing: 'border-box'
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
                    sx={{
                        color: '#FFFFFF'
                    }}
                >

                    <MenuIcon />

                </IconButton>

            </Box>


            {/* =====================================================
                MENU
            ===================================================== */}

            <List
                sx={{
                    px: 1
                }}
            >

                {/* DASHBOARD */}

                <ListItemButton
                    component={Link}
                    to="/dashboard"
                    sx={{
                        my: 0.5,
                        borderRadius: 2,

                        '&:hover': {
                            backgroundColor: '#334155'
                        }
                    }}
                >

                    <DashboardIcon
                        sx={{
                            mr: collapsed ? 0 : 2,
                            color: '#90CAF9'
                        }}
                    />

                    {!collapsed && (

                        <ListItemText
                            primary="Dashboard"
                        />

                    )}

                </ListItemButton>


                {/* CONTATOS */}

                {(isAdmin || isSupervisor) && (

    <ListItemButton
        component={Link}
        to="/contacts"
        sx={{
            my: 0.5,
            borderRadius: 2,

            '&:hover': {
                backgroundColor: '#334155'
            }
        }}
    >

        <PeopleIcon
            sx={{
                mr: collapsed ? 0 : 2,
                color: '#90CAF9'
            }}
        />

        {!collapsed && (
            <ListItemText
                primary="Contatos"
            />
        )}

    </ListItemButton>

)}
                {/* CONVERSAS */}

                <ListItemButton
                    component={Link}
                    to="/conversations"
                    sx={{
                        my: 0.5,
                        borderRadius: 2,

                        '&:hover': {
                            backgroundColor: '#334155'
                        }
                    }}
                >

                    <ChatIcon
                        sx={{
                            mr: collapsed ? 0 : 2,
                            color: '#90CAF9'
                        }}
                    />

                    {!collapsed && (

                        <ListItemText
                            primary="Conversas"
                        />

                    )}

                </ListItemButton>


                {/* KANBAN */}

                <ListItemButton
                    component={Link}
                    to="/kanban"
                    sx={{
                        my: 0.5,
                        borderRadius: 2,

                        '&:hover': {
                            backgroundColor: '#334155'
                        }
                    }}
                >

                    <ViewKanbanIcon
                        sx={{
                            mr: collapsed ? 0 : 2,
                            color: '#90CAF9'
                        }}
                    />

                    {!collapsed && (

                        <ListItemText
                            primary="Kanban"
                        />

                    )}

                </ListItemButton>


                {/* USUÁRIOS */}

                <ListItemButton
                    component={Link}
                    to="/users"
                    sx={{
                        my: 0.5,
                        borderRadius: 2,

                        '&:hover': {
                            backgroundColor: '#334155'
                        }
                    }}
                >

                    <PersonIcon
                        sx={{
                            mr: collapsed ? 0 : 2,
                            color: '#90CAF9'
                        }}
                    />

                    {!collapsed && (

                        <ListItemText
                            primary="Usuários"
                        />

                    )}

                </ListItemButton>

            </List>


            {/* =====================================================
                ÁREA INFERIOR
            ===================================================== */}

            <Box
                sx={{
                    marginTop: 'auto',
                    px: 1,
                    pb: 1
                }}
            >

                {/* =================================================
                    USUÁRIO LOGADO
                ================================================= */}

                {!collapsed && (

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            px: 1,
                            py: 1.5
                        }}
                    >

                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                backgroundColor: '#1976d2'
                            }}
                        >
                            {user?.name?.charAt(0).toUpperCase()}
                        </Avatar>


                        <Box
                            sx={{
                                overflow: 'hidden'
                            }}
                        >

                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                noWrap
                            >
                                {user?.name}
                            </Typography>


                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#94A3B8'
                                }}
                            >
                                {user?.role}
                            </Typography>

                        </Box>

                    </Box>

                )}


                {/* =================================================
                    LOGOUT
                ================================================= */}

                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        my: 0.5,
                        borderRadius: 2,

                        justifyContent: collapsed
                            ? 'center'
                            : 'flex-start',

                        '&:hover': {
                            backgroundColor: '#334155'
                        }
                    }}
                >

                    <LogoutIcon
                        sx={{
                            mr: collapsed ? 0 : 2,
                            color: '#90CAF9'
                        }}
                    />

                    {!collapsed && (

                        <ListItemText
                            primary="Sair"
                        />

                    )}

                </ListItemButton>


                {/* =================================================
                    VERSÃO
                ================================================= */}

                <Typography
                    variant="caption"
                    sx={{
                        display: 'block',
                        pt: 1,
                        textAlign: 'center',
                        color: '#94A3B8'
                    }}
                >
                    ConnectCRM v1.0
                </Typography>

            </Box>

        </Box>

    );

}


export default Sidebar;