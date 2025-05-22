import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './i18n';

import App from './app/App';
import { ClientProvider } from './app/client/ClientProvider';
import { Initializer } from './app/store/Initializer';
import { LanguageProvider } from './context/LanguageProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { store } from './app/store';

import './app/index.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ClientProvider>
      <Provider store={store}>
        <Initializer />
        <LanguageProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </LanguageProvider>
      </Provider>
    </ClientProvider>
  </BrowserRouter>
);
