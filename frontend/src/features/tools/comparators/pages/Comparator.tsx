import { useParams } from "react-router-dom";
import ComparatorEntry from "../components/ComparatorEntry";
import { type ComparatorEntryType } from "../types";
import Button from "../../../../components/Button";
import { useEffect, useState } from "react";
import Icon from "../../../../components/Icon";
import { useComparator } from "../hooks/useComparator";

const Comparator = () => {
  const { toolId } = useParams();
  const id = parseInt(toolId!);

  const {
    comparator,
    isLoading,
    error,
    addEntry,
    editEntry,
    deleteEntry,
    addProCon,
    editProCon,
    deleteProCon,
  } = useComparator(id);

  const [entries, setEntries] = useState<ComparatorEntryType[]>(
    comparator?.entries || [],
  );

  useEffect(() => {
    if (comparator?.entries) {
      setEntries(comparator.entries);
    }
  }, [comparator]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  const entriesMapped = entries.map((entry: ComparatorEntryType) => (
    <ComparatorEntry
      key={entry.id}
      entry={entry}
      editFn={(data) => editEntry.mutate(data)}
      deleteFn={(id) => deleteEntry.mutate(id)}
      addProConFn={(data) => addProCon.mutate(data)}
      editProConFn={(data) => editProCon.mutate(data)}
      deleteProConFn={(id) => deleteProCon.mutate(id)}
    />
  ));

  return (
    <section className="p-base flex w-full flex-col items-center justify-center">
      {comparator && (
        <>
          <h1 className="text-4xl">{comparator.name}</h1>
          <Button
            size="lg"
            className="mt-base"
            onClick={() => addEntry.mutate()}
          >
            <Icon name="add" />
          </Button>
          <div className="gap-base mt-base flex w-full max-w-256 flex-col">
            {entriesMapped}
          </div>
        </>
      )}
    </section>
  );
};

export default Comparator;
