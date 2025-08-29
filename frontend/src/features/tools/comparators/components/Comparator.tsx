import { useParams } from "react-router-dom";
import ComparatorEntry from "./ComparatorEntry";
import { type ComparatorEntryType } from "../types";
import Button from "../../../../components/Button";
import api from "../../../../lib/api";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchComparator } from "../services";
import Icon from "../../../../components/Icon";

const Comparator = () => {
  const { toolId: comparatorId } = useParams();

  const {
    data: comparator,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comparator", comparatorId],
    queryFn: () => fetchComparator(parseInt(comparatorId!)),
  });

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

  const handleAddEntry = async () => {
    await api
      .post(`/tools/comparators/${comparatorId}/entries`, null, {
        params: {
          name: "new entry",
        },
      })
      .then(function (response) {
        setEntries([
          {
            id: response.data.entry.id,
            name: response.data.entry.name,
            pros_cons: response.data.pros_cons,
          },
          ...entries,
        ]);
      });
  };

  const handleDeleteEntry = async (id: number) => {
    await api.delete(`/tools/comparators/entries/${id}`).then(function () {
      setEntries(entries.filter((entry) => entry.id != id));
    });
  };

  const entriesMapped = entries.map((entry: ComparatorEntryType) => (
    <ComparatorEntry
      key={entry.id}
      entry={entry}
      deleteFunction={handleDeleteEntry}
    />
  ));

  return (
    <section className="p-base flex w-full flex-col items-center justify-center">
      {comparator && (
        <>
          <h1 className="text-4xl">{comparator.name}</h1>
          <Button size="lg" className="mt-base" onClick={handleAddEntry}>
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
