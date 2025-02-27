import React from 'react';
import { useTranslation } from 'react-i18next';

import { Header } from '../shared/header/Header';
import logo from './logo.svg';

import './App.css';

function App() {

  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
}

export default App;
