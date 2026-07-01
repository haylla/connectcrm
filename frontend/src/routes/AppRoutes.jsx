import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Contacts from '../pages/Contacts/Contacts';

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
            </Routes>

        </BrowserRouter>
    );

}

export default AppRoutes;