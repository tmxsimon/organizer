import Icon from "./Icon";
import { useTheme } from "../contexts/themeProvider";
import { switchLanguage } from "../utils";
import i18n from "../lib/i18n";
import type ICONS from "../constants/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-main text-text sticky top-0 flex h-10 w-full items-center justify-between px-4">
      <div className="flex h-full items-center px-2 hover:underline">
        <Link to="/"> Organizer</Link>
      </div>
      <div className="flex h-full items-center">
        <button className="h-3/5 cursor-pointer px-2" onClick={switchLanguage}>
          <Icon name={i18n.language as keyof typeof ICONS} />
        </button>
        <button className="h-3/5 cursor-pointer px-2" onClick={toggleTheme}>
          <Icon name={theme === "dark" ? "moon" : "sun"} />
        </button>
        <Link className="h-3/5 cursor-pointer px-2" to="/">
          <Icon name="home" />
        </Link>
        <Link className="h-3/5 cursor-pointer px-2" to="/tools">
          <Icon name="tools" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
