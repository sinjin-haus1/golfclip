import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../lib/apollo';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

export default function App({ Component, pageProps }: AppProps) {
  const [client] = useState(() => apolloClient);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}