import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './components/App/App';
import MainGame from 'components/MainGame/MainGame';
import ResourceGrid from 'components/ResourceDisplay/ResourceDisplay';
import { createTheme, MantineProvider, Box } from '@mantine/core';
const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <Box p={"md"}>
            <ResourceGrid />
            <MainGame />
            </Box>
        </MantineProvider>
    </React.StrictMode>
);
