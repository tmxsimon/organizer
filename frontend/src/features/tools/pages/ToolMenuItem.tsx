import api from "../../../lib/api";
import InlineEditableItem from "../components/InlineEditableItem";
import type { ToolType } from "../types";

type ToolMenuItemProps = {
  tool: ToolType;
  toolsType?: string;
  deleteFunction: (id: number) => void;
};

const ToolMenuItem = ({
  tool,
  toolsType,
  deleteFunction,
}: ToolMenuItemProps) => {
  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   useSortable({ id: tool.id });

  // const style = {
  //   transition,
  //   transform: CSS.Transform.toString(transform),
  // };

  const handleEditProCon = async (name: string) => {
    await api
      .put(`/tools/comparators/${tool.id}`, null, {
        params: { name: name },
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {/* <div ref={setNodeRef} style={style} {...attributes} {...listeners}> */}
      <InlineEditableItem
        value={tool.name}
        editFunction={handleEditProCon}
        deleteFunction={() => deleteFunction(tool.id)}
        href={`/tools/${toolsType}/${tool.id}`}
        className="rounded-base border-contrast h-18 border px-2"
        classNameText="text-2xl "
      />
    </div>
  );
};

export default ToolMenuItem;
