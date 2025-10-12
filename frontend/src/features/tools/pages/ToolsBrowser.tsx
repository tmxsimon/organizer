import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type ToolsBrowserItemProps = {
  name: string;
  href: string;
  iconUrl?: string;
};

const ToolsBrowserItem = ({ name, href, iconUrl }: ToolsBrowserItemProps) => {
  return (
    <Link to={href} className="group rounded-base text-center">
      <img
        src={iconUrl}
        alt={`${name} icon`}
        className="rounded-base size-48 object-cover"
      />
      <p className="group-hover:underline">{name}</p>
    </Link>
  );
};

const ToolsBrowser = () => {
  const { t } = useTranslation();
  return (
    <section className="p-base flex w-full flex-col items-center justify-center">
      <h1 className="text-center text-6xl">{t("common.tools")}</h1>
      <div className="mt-base gap-base flex flex-wrap justify-center">
        {/* <ToolsBrowserItem
          name={`${t("tools.charts")} (WIP)`}
          href="/tools/charts"
          iconUrl="/src/features/tools/assets/charts.png"
        />
        <ToolsBrowserItem
          name={`${t("tools.trackers")} (WIP)`}
          href="/tools/trackers"
          iconUrl="/src/features/tools/assets/trackers.png"
        />
        <ToolsBrowserItem
          name={`${t("tools.sprinters")} (WIP)`}
          href="/tools/sprinters"
          iconUrl="/src/features/tools/assets/sprinters.png"
        /> */}
        <ToolsBrowserItem
          name={t("tools.todos.todos")}
          href="/tools/todos"
          iconUrl="/src/features/tools/assets/todos.png"
        />
        <ToolsBrowserItem
          name={t("tools.comparators.comparators")}
          href="/tools/comparators"
          iconUrl="/src/features/tools/assets/comparators.png"
        />
        {/* <ToolsBrowserItem
          name={`${t("tools.events")} (WIP)`}
          href="/tools/events"
          iconUrl="/src/features/tools/assets/events.png"
        /> */}
      </div>
    </section>
  );
};

export default ToolsBrowser;
