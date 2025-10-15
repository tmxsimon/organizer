import InlineEditableItem from "./InlineEditableItem";
import type { ToolType } from "../types";

type ToolMenuItemProps = {
  tool: ToolType;
  toolsType?: string;
  editFn: (data: { id: number; name: string }) => void;
  deleteFn: (id: number) => void;
};

const ToolMenuItem = ({
  tool,
  toolsType,
  editFn,
  deleteFn,
}: ToolMenuItemProps) => {
  return (
    <InlineEditableItem
      value={tool.name}
      editFn={(name) => editFn({ id: tool.id, name: name })}
      deleteFn={() => deleteFn(tool.id)}
      href={`/tools/${toolsType}/${tool.id}`}
      className="rounded-base border-contrast p-base-s border"
      classNameText="text-3xl"
      classNameButtons="h-10"
    />
  );
};

export default ToolMenuItem;
