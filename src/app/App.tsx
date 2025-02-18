import React from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeProvider } from '../context/ThemeProvider';
import { Header } from '../shared/header/Header';
import { LanguageProvider } from 'src/context/LanguageProvider';
import logo from './logo.svg';

import './App.css';

function App() {

  const { t } = useTranslation();

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Header />
        <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {t('objectives')}:{' '}
            {t('goal.improve_skills')}
          </p>
          <p>
            {t('technologies.learning')}:{' '}
            {t('technologies.zoom_drawing_patterns')}{' '}
          </p>
          <p>
            {t('technologies.known')}:{' '}
            HTML, CSS, JS, TS, React.
          </p>
          <p>
            {t('about_me')}:{' '}
            {t('experience')}
          </p>
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
