import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Layout } from 'src/widgets/Layout/Layout';
import { LanguageProvider } from 'src/context/LanguageProvider';
import { ThemeProvider } from 'src/context/ThemeProvider';
import { ClientProvider } from './client/ClientProvider';

import { Navigation } from './navigation/Navigation';
import { store } from './store';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ClientProvider>
        <Provider store={store} >
          <LanguageProvider>
            <ThemeProvider>
              <Layout>
                <Navigation />
              </Layout>
            </ThemeProvider>
          </LanguageProvider>
        </Provider>
      </ClientProvider>
    </BrowserRouter>
  )
}

export default App;
