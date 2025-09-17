import Icon from "../../../../components/Icon";
import api from "../../../../lib/api";
import InlineEditableItem from "../../components/InlineEditableItem";
import type { TodoEntryType } from "../types";

type TodoEntryProps = {
  entry: TodoEntryType;
  toggleFunction: (id: number) => void;
  deleteFunction: (id: number) => void;
};

const TodoEntry = ({
  entry,
  toggleFunction,
  deleteFunction,
}: TodoEntryProps) => {
  const handleEditEntry = async (text: string) => {
    await api
      .put(`/tools/todos/entries/${entry.id}`, null, {
        params: { text: text },
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const extraButtons = (
    <button
      className="h-full cursor-pointer"
      onClick={() => toggleFunction(entry.id)}
    >
      {entry.is_done ? <Icon name="dismiss" /> : <Icon name="check" />}
    </button>
  );

  return (
    <InlineEditableItem
      value={entry.text}
      editFunction={handleEditEntry}
      deleteFunction={() => deleteFunction(entry.id)}
      extraButtons={extraButtons}
      className="rounded-base p-base-s border"
      classNameText="text-2xl"
    />
  );
};

export default TodoEntry;
