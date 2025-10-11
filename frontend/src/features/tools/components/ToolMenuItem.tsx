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
    <div>
      <InlineEditableItem
        value={tool.name}
        editFn={(name) => editFn({ id: tool.id, name: name })}
        deleteFn={() => deleteFn(tool.id)}
        href={`/tools/${toolsType}/${tool.id}`}
        className="rounded-base border-contrast px-base-s h-18 border"
        classNameText="text-2xl "
      />
    </div>
  );
};

export default ToolMenuItem;
