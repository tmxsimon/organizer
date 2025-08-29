import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchTools } from "../services";
import api from "../../../lib/api";
import { useEffect, useState } from "react";
import Icon from "../../../components/Icon";
import type { ToolType } from "../types";
import ToolMenuItem from "./ToolMenuItem";

const ToolMenu = () => {
  const { t } = useTranslation();
  const { toolsType } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["tools", toolsType],
    queryFn: () => fetchTools(toolsType!),
  });

  const [tools, setTools] = useState<ToolType[]>(data || []);

  useEffect(() => {
    if (data) {
      setTools(data);
    }
  }, [data]);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleCreateTool = async () => {
    api
      .post(`tools/${toolsType}`, null, {
        params: {
          name: "new tool",
          description: "",
        },
      })
      .then(function (response) {
        setTools([
          {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            date_created: response.data.date_created,
          },
          ...tools,
        ]);
      });
  };

  const handleDeleteTool = async (id: number) => {
    api.delete(`tools/${toolsType}/${id}`).then(function () {
      setTools(tools.filter((tool) => tool.id != id));
    });
  };

  return (
    <>
      <section className="p-base flex w-full flex-col items-center justify-center">
        <h1 className="text-center text-6xl">{t(`tools.${toolsType}`)}</h1>
        <Button
          size="lg"
          className="mt-base text-4xl"
          onClick={handleCreateTool}
        >
          <Icon name="add" />
        </Button>
        <div className="mt-base gap-base flex w-full flex-col flex-wrap items-center">
          <div className="rounded-base flex w-256 flex-col gap-2">
            {tools.map((tool: ToolType) => {
              return (
                <ToolMenuItem
                  key={tool.id}
                  tool={tool}
                  deleteFunction={handleDeleteTool}
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
