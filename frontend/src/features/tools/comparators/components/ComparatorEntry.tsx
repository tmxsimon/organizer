import ProConItem from "./ProConItem";
import Icon from "../../../../components/Icon";
import InlineEditableItem from "../../components/InlineEditableItem";
import type { ComparatorEntryType, ProConType } from "../types";

type ComparatorEntryProps = {
  entry: ComparatorEntryType;
  editFn: (data: { id: number; name: string }) => void;
  deleteFn: (id: number) => void;
  addProConFn: (data: { entryId: number; type: "pro" | "con" }) => void;
  editProConFn: (data: { id: number; text: string }) => void;
  deleteProConFn: (id: number) => void;
};

const ComparatorEntry = ({
  entry,
  editFn,
  deleteFn,
  addProConFn,
  editProConFn,
  deleteProConFn,
}: ComparatorEntryProps) => {
  const pros = entry.pros_cons.filter(
    (proCon: ProConType) => proCon.type == "pro",
  );
  const cons = entry.pros_cons.filter(
    (proCon: ProConType) => proCon.type == "con",
  );

  return (
    <div className="rounded-base border-contrast p-base-s border">
      <InlineEditableItem
        value={entry.name}
        editFn={(name) => editFn({ id: entry.id, name: name })}
        deleteFn={() => deleteFn(entry.id)}
        classNameText="text-2xl"
      />
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-good text-2xl">Pros</h2>
          <button
            className="size-8 cursor-pointer"
            onClick={() => addProConFn({ entryId: entry.id, type: "pro" })}
          >
            <Icon name="add" />
          </button>
        </div>
        <ul>
          {pros.map((pro: ProConType) => (
            <li key={pro.id} className="ml-4 list-disc">
              <ProConItem
                proCon={pro}
                editFn={(data) => editProConFn(data)}
                deleteFn={(id) => deleteProConFn(id)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-bad text-2xl">Cons</h2>
          <button
            className="size-8 cursor-pointer"
            onClick={() => addProConFn({ entryId: entry.id, type: "con" })}
          >
            <Icon name="add" />
          </button>
        </div>
        <ul>
          {cons.map((con: ProConType) => (
            <li key={con.id} className="rounded-base ml-4 list-disc">
              <ProConItem
                proCon={con}
                editFn={(data) => editProConFn(data)}
                deleteFn={(id) => deleteProConFn(id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComparatorEntry;
