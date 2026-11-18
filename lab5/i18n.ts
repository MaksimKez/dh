import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "Ashen Gate",
        greeting: "Hello, {{name}}",
        namePlaceholder: "Enter the name...",
        changeLanguage: "Change the language",
        changeTheme: "Change the motif (bright/dark)",
      },
    },
    pl: {
      translation: {
        title: "Popielna Brama",
        greeting: "Witaj, {{name}}",
        namePlaceholder: "Wpisz imię...",
        changeLanguage: "Zmień język",
        changeTheme: "Zmień motyw (jasny/ciemny)",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
