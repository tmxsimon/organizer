import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import type { ToolType } from "../types";
import ToolMenuItem from "../components/ToolMenuItem";
import { useTools } from "../hooks/useTools";

const ToolMenu = () => {
  const { t } = useTranslation();
  const { toolsType } = useParams();

  const { tools, isLoading, error, addEntry, editEntry, deleteEntry } =
    useTools(toolsType!);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <section className="p-base flex w-full flex-col items-center justify-center">
        <h1 className="text-center text-6xl">{t(`tools.${toolsType}`)}</h1>
        <Button
          size="lg"
          className="mt-base text-4xl"
          onClick={() => addEntry.mutate()}
        >
          <Icon name="add" />
        </Button>
        <div className="mt-base gap-base flex w-full flex-col flex-wrap items-center">
          <div className="rounded-base gap-base-s flex w-256 flex-col">
            {tools?.map((tool: ToolType) => {
              return (
                <ToolMenuItem
                  key={tool.id}
                  tool={tool}
                  editFn={(data) => editEntry.mutate(data)}
                  deleteFn={(id) => deleteEntry.mutate(id)}
                  toolsType={toolsType}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ToolMenu;
