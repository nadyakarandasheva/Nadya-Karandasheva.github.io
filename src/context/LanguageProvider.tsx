import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import i18n from 'i18next';

type LanguageContextType = {
  currentLang: string;
  switchLanguage: (lang: string) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  currentLang: 'ru',
  switchLanguage: (lang: string) => undefined,
});

/**
 * Интерфейс компонента провайдера языка.
 */
interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Компонент провайдера языка.
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(i18n.language || 'ru'); // Устанавливаем текущий язык (по умолчанию 'ru')

  useEffect(() => {
    // Слушаем изменения языка, чтобы обновлять состояние контекста
    i18n.on('languageChanged', (lng) => {
      setCurrentLang(lng);
    });

    // Очистка события при размонтировании компонента
    return () => {
      i18n.off('languageChanged');
    };
  }, []);

  const switchLanguage = (lang: string) => {
    if (lang && lang !== currentLang) {
      i18n.changeLanguage(lang).catch((error) => console.error('Ошибка смены языка:', error));
    }
  };

  return <LanguageContext.Provider value={{ currentLang, switchLanguage }}>{children}</LanguageContext.Provider>;
};
