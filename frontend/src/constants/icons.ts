import Delete from "../assets/icons/delete.svg?react";
import Check from "../assets/icons/check.svg?react";
import Edit from "../assets/icons/edit.svg?react";
import Cross from "../assets/icons/cross.svg?react";
import Plus from "../assets/icons/plus.svg?react";
import Back from "../assets/icons/back.svg?react";
import Sun from "../assets/icons/sun.svg?react";
import Moon from "../assets/icons/moon.svg?react";
import Home from "../assets/icons/home.svg?react";
import Tools from "../assets/icons/tools.svg?react";

import USA from "../assets/icons/countries/usa.svg?react";
import Russia from "../assets/icons/countries/russia.svg?react";
import Czechia from "../assets/icons/countries/czechia.svg?react";
import Israel from "../assets/icons/countries/israel.svg?react";

const ICONS = {
  // Common
  delete: Delete,
  check: Check,
  edit: Edit,
  dismiss: Cross,
  add: Plus,
  back: Back,
  sun: Sun,
  moon: Moon,
  home: Home,
  tools: Tools,

  // Languages
  "en-US": USA,
  "ru-RU": Russia,
  "cs-CZ": Czechia,
  "he-IL": Israel,
};

export default ICONS;
