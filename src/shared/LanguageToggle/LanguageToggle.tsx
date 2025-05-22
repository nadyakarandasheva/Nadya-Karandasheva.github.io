import React from 'react';
import { useTranslation } from 'react-i18next';

import './languageToggle.css';

/**
 * Компонент переключателя языка.
 * @returns
 */
export const LanguageToggle = () => {
  const { t, i18n } = useTranslation();

  // Переключение языка
  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang).catch((error) => console.error('Ошибка переключения языка:', error));
  };

  return (
    <div className="languageToggle">
      <button onClick={() => switchLanguage('en')} className="switchLanguagebutton">
        EN
      </button>
      <button onClick={() => switchLanguage('ru')} className="switchLanguagebutton">
        RU
      </button>
      <p>{t('languageSwitch')}</p>
    </div>
  );
};
