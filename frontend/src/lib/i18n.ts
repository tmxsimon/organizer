import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en-US.json";
import cz from "../locales/cs-CZ.json";
import ru from "../locales/ru-RU.json";

export const lngResources = {
  "en-US": en,
  "cs-CZ": cz,
  "ru-RU": ru,
};

const lng = localStorage.getItem("lang") || "en-US";

i18n.use(initReactI18next).init({
  resources: lngResources,
  supportedLngs: ["en-US", "cs-CZ", "ru-RU"],
  lng: lng,
  fallbackLng: "en-US",

  detection: {
    caches: ["localStorage"],
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
