import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../themes/theme'; // Import your custom theme
import '../styles/profile.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
