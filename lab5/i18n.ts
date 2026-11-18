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
    ru: {
      translation: {
        title: "Пепельные врата",
        greeting: "Здравствуйте, {{name}}",
        namePlaceholder: "Введите имя...",
        changeLanguage: "Сменить язык",
        changeTheme: "Сменить мотив (светлый/тёмный)",
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
