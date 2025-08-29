import { useTranslation } from "react-i18next";
import Icon from "./Icon";
import { useTheme } from "../contexts/themeProvider";
import { switchLanguage } from "../utils";
import i18n from "../lib/i18n";
import type ICONS from "../constants/icons";

const NavbarItem = ({ text, href }: { text: string; href: string }) => {
  return (
    <a className="flex h-full items-center px-2 hover:underline" href={href}>
      {text}
    </a>
  );
};

const Navbar = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-main text-text sticky top-0 flex h-10 w-full items-center justify-between">
      <div className="flex h-full">
        <NavbarItem text="Organizer" href="/" />
      </div>
      <div className="flex h-full items-center">
        <button className="h-3/5 cursor-pointer px-2" onClick={switchLanguage}>
          <Icon name={i18n.language as keyof typeof ICONS} />
        </button>
        <button className="h-3/5 cursor-pointer px-2" onClick={toggleTheme}>
          <Icon name={theme === "dark" ? "moon" : "sun"} />
        </button>
        <ul className="flex h-full">
          <li>
            <NavbarItem text={t("common.home")} href="/" />
          </li>
          <li>
            <NavbarItem text={t("common.tools")} href="/tools" />
          </li>

          {/* <li>
            <NavbarItem text={t("common.profile")} href="/profile" />
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
