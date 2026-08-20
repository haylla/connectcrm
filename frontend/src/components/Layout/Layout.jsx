import { Box } from '@mui/material';

import Sidebar from '../Sidebar/Sidebar';

function Layout({ children }) {

    return (

        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: '#f5f6fa'
            }}
        >

            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    minHeight: '100vh'
                }}
            >

                {children}

            </Box>

        </Box>

    );

}

export default Layout;