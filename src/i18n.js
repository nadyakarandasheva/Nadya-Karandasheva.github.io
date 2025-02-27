import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './localization/en.json';
import ru from './localization/ru.json';

i18n
  .use(initReactI18next) // Подключение к React
  .init({
    resources: {
      en: { translation: en }, // Переводы на английском
      ru: { translation: ru }, // Переводы на русском
    },
    lng: 'ru', // Язык приложения по умолчанию
    fallbackLng: 'en', // Резервный язык, если перевод отсутствует
    interpolation: {
      escapeValue: false, // Не экранировать строки
    },
    debug: true, // Включение отладки
  });

export default i18n;
