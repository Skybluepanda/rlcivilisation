import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './components/App/App';
import App from 'components/App/App';
import { createTheme, MantineProvider } from '@mantine/core';
const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <App />
        </MantineProvider>
    </React.StrictMode>
);
