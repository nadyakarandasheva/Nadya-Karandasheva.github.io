import React from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';

import App from './app/App';

import './app/index.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);


