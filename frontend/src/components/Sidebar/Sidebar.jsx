import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

import Avatar from '@mui/material/Avatar';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';

function Sidebar() {

    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const user = JSON.parse(
        localStorage.getItem('user')
    );

    const isAdmin = user?.role === 'ADMIN';

    const isSupervisor =
        user?.role === 'SUPERVISOR';

    const sidebarWidth = collapsed ? 80 : 240;

    function handleLogout() {

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        window.location.href = '/';

    }

    function handleMobileClose() {

        setMobileOpen(false);

    }

    // =====================================================
    // CONTEÚDO DO MENU
    // =====================================================

    const menuContent = (

        <Box
            sx={{
                width: {
                    xs: 260,
                    sm: sidebarWidth
                },
                height: '100%',
                backgroundColor: '#1E293B',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
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
                    justifyContent: 'space-between',
                    px: 2,
                    boxSizing: 'border-box'
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                        display: {
                            xs: 'block',
                            sm: collapsed ? 'none' : 'block'
                        }
                    }}
                >
                    ConnectCRM
                </Typography>

                {/* FECHAR NO CELULAR */}

                <IconButton
                    onClick={() => {

                        if (window.innerWidth < 900) {

                            handleMobileClose();

                        } else {

                            setCollapsed(!collapsed);

                        }

                    }}
                    sx={{
                        color: '#FFFFFF'
                    }}
                >

                    {mobileOpen
                        ? <CloseIcon />
                        : <MenuIcon />
                    }

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
                    onClick={handleMobileClose}
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
                            mr: {
                                xs: 2,
                                sm: collapsed ? 0 : 2
                            },
                            color: '#90CAF9'
                        }}
                    />

                    <ListItemText
                        primary="Dashboard"
                        sx={{
                            display: {
                                xs: 'block',
                                sm: collapsed ? 'none' : 'block'
                            }
                        }}
                    />

                </ListItemButton>


                {/* CONTATOS */}

                {(isAdmin || isSupervisor) && (

                    <ListItemButton
                        component={Link}
                        to="/contacts"
                        onClick={handleMobileClose}
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
                                mr: {
                                    xs: 2,
                                    sm: collapsed ? 0 : 2
                                },
                                color: '#90CAF9'
                            }}
                        />

                        <ListItemText
                            primary="Contatos"
                            sx={{
                                display: {
                                    xs: 'block',
                                    sm: collapsed ? 'none' : 'block'
                                }
                            }}
                        />

                    </ListItemButton>

                )}


                {/* CONVERSAS */}

                <ListItemButton
                    component={Link}
                    to="/conversations"
                    onClick={handleMobileClose}
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
                            mr: {
                                xs: 2,
                                sm: collapsed ? 0 : 2
                            },
                            color: '#90CAF9'
                        }}
                    />

                    <ListItemText
                        primary="Conversas"
                        sx={{
                            display: {
                                xs: 'block',
                                sm: collapsed ? 'none' : 'block'
                            }
                        }}
                    />

                </ListItemButton>


                {/* KANBAN */}

                <ListItemButton
                    component={Link}
                    to="/kanban"
                    onClick={handleMobileClose}
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
                            mr: {
                                xs: 2,
                                sm: collapsed ? 0 : 2
                            },
                            color: '#90CAF9'
                        }}
                    />

                    <ListItemText
                        primary="Kanban"
                        sx={{
                            display: {
                                xs: 'block',
                                sm: collapsed ? 'none' : 'block'
                            }
                        }}
                    />

                </ListItemButton>


                {/* USUÁRIOS */}

                <ListItemButton
                    component={Link}
                    to="/users"
                    onClick={handleMobileClose}
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
                            mr: {
                                xs: 2,
                                sm: collapsed ? 0 : 2
                            },
                            color: '#90CAF9'
                        }}
                    />

                    <ListItemText
                        primary="Usuários"
                        sx={{
                            display: {
                                xs: 'block',
                                sm: collapsed ? 'none' : 'block'
                            }
                        }}
                    />

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

                {/* USUÁRIO LOGADO */}

                <Box
                    sx={{
                        display: {
                            xs: 'flex',
                            sm: collapsed ? 'none' : 'flex'
                        },
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
                        {user?.name
                            ?.charAt(0)
                            .toUpperCase()}
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


                {/* LOGOUT */}

                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        my: 0.5,
                        borderRadius: 2,

                        justifyContent: {
                            xs: 'flex-start',
                            sm: collapsed
                                ? 'center'
                                : 'flex-start'
                        },

                        '&:hover': {
                            backgroundColor: '#334155'
                        }
                    }}
                >

                    <LogoutIcon
                        sx={{
                            mr: {
                                xs: 2,
                                sm: collapsed ? 0 : 2
                            },
                            color: '#90CAF9'
                        }}
                    />

                    <ListItemText
                        primary="Sair"
                        sx={{
                            display: {
                                xs: 'block',
                                sm: collapsed ? 'none' : 'block'
                            }
                        }}
                    />

                </ListItemButton>


                {/* VERSÃO */}

                <Typography
                    variant="caption"
                    sx={{
                        display: {
                            xs: 'block',
                            sm: collapsed ? 'none' : 'block'
                        },
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

    return (

        <>

            {/* =====================================================
                BOTÃO MOBILE
            ===================================================== */}

            <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{
                    display: {
                        xs: 'flex',
                        sm: 'none'
                    },
                    position: 'fixed',
                    top: 12,
                    left: 12,
                    zIndex: 1300,
                    backgroundColor: '#1E293B',
                    color: '#FFFFFF',

                    '&:hover': {
                        backgroundColor: '#334155'
                    }
                }}
            >

                <MenuIcon />

            </IconButton>


            {/* =====================================================
                SIDEBAR DESKTOP
            ===================================================== */}

            <Box
                component="aside"
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'block'
                    },
                    width: sidebarWidth,
                    minWidth: sidebarWidth,
                    height: '100vh',
                    transition: 'width 0.2s ease'
                }}
            >

                {menuContent}

            </Box>


            {/* =====================================================
                SIDEBAR MOBILE
            ===================================================== */}

            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleMobileClose}
                sx={{
                    display: {
                        xs: 'block',
                        sm: 'none'
                    }
                }}
            >

                {menuContent}

            </Drawer>

        </>

    );

}

export default Sidebar;