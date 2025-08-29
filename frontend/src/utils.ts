import i18n from "./lib/i18n";
import { lngResources } from "./lib/i18n";

export const switchLanguage = () => {
  const currentLng = i18n.language;

  const keys = Object.keys(lngResources);
  const currentIndex = keys.indexOf(currentLng);

  const nextIndex = (currentIndex + 1) % keys.length;
  const nextLng = keys[nextIndex];

  i18n.changeLanguage(nextLng);
  localStorage.setItem("lang", nextLng!);
};
