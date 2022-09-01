import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enGeneral from './en/enGeneral';
import enWeather from './en/enWeather';
import trGeneral from './tr/trGeneral';
import trWeather from './tr/trWeather';



const defaultLocale = 'en'
const localeOptions = [
  { id: 'tr', name: 'Türkçe', icon: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/tr.svg'}, // https://cdn.jsdelivr.net/gh/madebybowtie/FlagKit@2.4/Assets/SVG/TR.svg
  { id: 'en', name: 'English', icon: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/us.svg'}, // - https://cdn.jsdelivr.net/gh/madebybowtie/FlagKit@2.4/Assets/SVG/US.svg
]

const locale = (localStorage.getItem('currentLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('currentLanguage')).length > 0) ? localStorage.getItem('currentLanguage') : defaultLocale;

const getLanguage = () => locale //i18n.language || localStorage.getItem('currentLanguage')

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    locale: locale,
    lng: locale,
    fallbackLng: locale,
    supportedLngs: localeOptions.forEach(a=>{return a.id}),
    whitelist: localeOptions.forEach(a=>{return a.id}),
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

export { i18n, getLanguage, localeOptions, locale };