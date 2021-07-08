import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "./translation.json";


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: translation,
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });