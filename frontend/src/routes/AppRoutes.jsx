import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Contacts from '../pages/Contacts/Contacts';
import Conversations from '../pages/Conversations/Conversations';
import Kanban from '../pages/Kanban/Kanban';
import Users from '../pages/Users/Users';

import Layout from '../components/Layout/Layout';
import ProtectedRoute from '../components/Auth/ProtectedRoute';


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN */}
                <Route
                    path="/"
                    element={<Login />}
                />


                {/* DASHBOARD - TODOS */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                'ADMIN',
                                'SUPERVISOR',
                                'AGENT'
                            ]}
                        >
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />


                {/* CONTATOS - ADMIN E SUPERVISOR */}
                <Route
                    path="/contacts"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                'ADMIN',
                                'SUPERVISOR'
                            ]}
                        >
                            <Layout>
                                <Contacts />
                            </Layout>
                        </ProtectedRoute>
                    }
                />


                {/* CONVERSAS - TODOS */}
                <Route
                    path="/conversations"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                'ADMIN',
                                'SUPERVISOR',
                                'AGENT'
                            ]}
                        >
                            <Layout>
                                <Conversations />
                            </Layout>
                        </ProtectedRoute>
                    }
                />


                {/* KANBAN - ADMIN E SUPERVISOR */}
                <Route
                    path="/kanban"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                'ADMIN',
                                'SUPERVISOR'
                            ]}
                        >
                            <Layout>
                                <Kanban />
                            </Layout>
                        </ProtectedRoute>
                    }
                />


                {/* USUÁRIOS - SOMENTE ADMIN */}
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                'ADMIN'
                            ]}
                        >
                            <Layout>
                                <Users />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;