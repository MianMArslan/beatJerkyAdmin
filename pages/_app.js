import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../themes/theme'; // Import your custom theme
import '../styles/profile.css';
 
import AppContextProvider from '@/context/appContext';
export default function MyApp({ Component, pageProps }) {
  return (
   
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContextProvider>
        <Component {...pageProps} />
        </AppContextProvider>
      </ThemeProvider>
      
  );
}
