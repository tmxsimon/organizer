import { useTranslation } from "react-i18next";
import { useTheme } from "../../../contexts/themeProvider";
import VERSION from "../../../constants/version";

const Homepage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const welcomeBg =
    theme === "dark"
      ? "bg-[url(features/home/assets/pattern.png)]"
      : "bg-[url(features/home/assets/pattern-light.png)]";

  return (
    <>
      <section
        className={`px-base flex h-128 w-full flex-col items-center justify-center ${welcomeBg} bg-cover bg-center`}
      >
        <h1 className="text-center text-8xl">{t("homepage.welcome")}</h1>
      </section>
      <section className="px-base flex h-96 w-full flex-col items-center justify-center">
        <h1 className="text-center text-4xl">
          {t("common.version")} {VERSION}
        </h1>
        <p className="max-w-196 text-center">{t(`updates.${VERSION}`)}</p>
      </section>
    </>
  );
};

export default Homepage;
