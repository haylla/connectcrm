import { createTheme } from '@mui/material/styles';

const theme = createTheme({

    palette: {

        primary: {
            main: '#1976D2'
        },

        secondary: {
            main: '#26A69A'
        },

        success: {
            main: '#2E7D32'
        },

        background: {
            default: '#F5F7FA',
            paper: '#FFFFFF'
        },

        text: {
            primary: '#263238',
            secondary: '#607D8B'
        }

    },

    shape: {
        borderRadius: 12
    },

    typography: {

        fontFamily: 'Roboto, Arial, sans-serif',

        h4: {
            fontWeight: 700
        },

        h5: {
            fontWeight: 600
        },

        h6: {
            fontWeight: 600
        },

        button: {
            textTransform: 'none',
            fontWeight: 600
        }

    },

    components: {

        MuiButton: {

            styleOverrides: {

                root: {

                    borderRadius: 10,
                    padding: '10px 20px'

                }

            }

        },

        MuiPaper: {

            styleOverrides: {

                root: {

                    borderRadius: 14

                }

            }

        },

        MuiTextField: {

            defaultProps: {

                variant: 'outlined',
                size: 'small'

            }

        }

    }

});

export default theme;