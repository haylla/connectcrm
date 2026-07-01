import { Box } from '@mui/material';

function Layout({ children }) {

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: '#f5f6fa'
            }}
        >
            {children}
        </Box>
    );

}

export default Layout;