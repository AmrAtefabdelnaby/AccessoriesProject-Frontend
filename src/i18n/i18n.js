import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Load translations from files
  .use(LanguageDetector) // Detect user's language
  .use(initReactI18next) // Bind i18next to React
  .init({
    supportedLngs: ["en", "ar"], // Supported languages
    fallbackLng: "en", // Fallback language
    debug: true,
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to translation files
    },
    detection: {
      order: ["path", "cookie", "localStorage", "navigator"], // Detect from these sources
      caches: ["cookie"], // Cache user language
    },
    react: {
      useSuspense: false, // Disable suspense mode
    },
  });

export default i18n;
