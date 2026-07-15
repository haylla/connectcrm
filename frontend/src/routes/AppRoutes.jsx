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

function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/contacts"
                    element={<Contacts />}
                />
                <Route
                    path="/conversations"
                    element={<Conversations />}
                />
                <Route
                    path="/kanban"
                    element={<Kanban />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;