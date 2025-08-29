import { useState } from "react";
import api from "../../../../lib/api";
import ProConItem from "./ProConItem";
import Icon from "../../../../components/Icon";
import InlineEditableItem from "../../components/InlineEditableItem";
import type { ComparatorEntryType, ProConType } from "../types";

type ComparatorEntryProps = {
  entry: ComparatorEntryType;
  deleteFunction: (id: number) => void;
};

const ComparatorEntry = ({ entry, deleteFunction }: ComparatorEntryProps) => {
  const [prosCons, setProsCons] = useState<ProConType[]>(entry.pros_cons);

  const pros = prosCons.filter((proCon: ProConType) => proCon.type == "pro");
  const cons = prosCons.filter((proCon: ProConType) => proCon.type == "con");

  const handleEditEntry = async (name: string) => {
    await api
      .put(`/tools/comparators/entries/${entry.id}`, null, {
        params: { name: name },
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddProCon = async (type: "pro" | "con") => {
    await api
      .post(`/tools/comparators/entries/${entry.id}`, null, {
        params: {
          text: `new ${type}`,
          type: type,
        },
      })
      .then(function (response) {
        setProsCons([
          {
            id: response.data[type].id,
            text: response.data[type].text,
            type: type,
          },
          ...prosCons,
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDeleteProCon = async (id: number) => {
    await api
      .delete(`/tools/comparators/pros-cons/${id}`)
      .then(function () {
        setProsCons(prosCons.filter((proCon) => proCon.id != id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="rounded-base border-contrast border p-4">
      <InlineEditableItem
        value={entry.name}
        editFunction={handleEditEntry}
        deleteFunction={() => deleteFunction(entry.id)}
        classNameText="text-2xl"
      />
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-good text-2xl">Pros</h2>
          <button
            className="size-8 cursor-pointer"
            onClick={() => handleAddProCon("pro")}
          >
            <Icon name="add" />
          </button>
        </div>
        <ul>
          {pros.map((pro: ProConType) => (
            <li key={pro.id} className="ml-4 list-disc">
              <ProConItem proCon={pro} deleteFunction={handleDeleteProCon} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-bad text-2xl">Cons</h2>
          <button
            className="size-8 cursor-pointer"
            onClick={() => handleAddProCon("con")}
          >
            <Icon name="add" />
          </button>
        </div>
        <ul>
          {cons.map((con: ProConType) => (
            <li key={con.id} className="rounded-base ml-4 list-disc">
              <ProConItem proCon={con} deleteFunction={handleDeleteProCon} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComparatorEntry;
