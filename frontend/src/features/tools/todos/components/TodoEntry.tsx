import Icon from "../../../../components/Icon";
import InlineEditableItem from "../../components/InlineEditableItem";
import type { TodoEntryType } from "../types";

type TodoEntryProps = {
  entry: TodoEntryType;
  editFn: (data: { id: number; text: string }) => void;
  toggleFn: (id: number) => void;
  deleteFn: (id: number) => void;
};

const TodoEntry = ({ entry, editFn, toggleFn, deleteFn }: TodoEntryProps) => {
  const extraButtons = (
    <button
      className="h-full cursor-pointer"
      onClick={() => toggleFn(entry.id)}
    >
      {entry.is_done ? <Icon name="dismiss" /> : <Icon name="check" />}
    </button>
  );

  return (
    <InlineEditableItem
      value={entry.text}
      editFn={(text) => editFn({ id: entry.id, text: text })}
      deleteFn={() => deleteFn(entry.id)}
      extraButtons={extraButtons}
      className="rounded-base p-base-s border"
      classNameText="text-2xl"
    />
  );
};

export default TodoEntry;
