import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enGeneral from './en/enGeneral';
import enWeather from './en/enWeather';
import trGeneral from './tr/trGeneral';
import trWeather from './tr/trWeather';

const getLanguage = () => i18n.language || window.localStorage.i18nLng

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          ...enGeneral,
          ...enWeather
        }
      },
      tr: {
        translation: {
          ...trGeneral,
          ...trWeather
        }
      }
    }
  });

export { i18n, getLanguage };