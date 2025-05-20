import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './i18n';

import App from './app/App';
import { LanguageProvider } from './context/LanguageProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { ClientProvider } from './app/client/ClientProvider';
import { store } from './app/store';

import './app/index.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <ClientProvider>
    <Provider store={store} >
      <LanguageProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LanguageProvider>
    </Provider>
  </ClientProvider>
);


