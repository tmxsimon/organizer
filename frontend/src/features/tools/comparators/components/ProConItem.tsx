import api from "../../../../lib/api";
import type { ProConType } from "../types";
import InlineEditableItem from "../../components/InlineEditableItem";

type ProConItemProps = React.InputHTMLAttributes<HTMLInputElement> & {
  proCon: ProConType;
  deleteFunction: (id: number) => void;
};

const ProConItem = ({ proCon, deleteFunction }: ProConItemProps) => {
  const handleEditProCon = async (text: string) => {
    await api
      .put(`/tools/comparators/pros-cons/${proCon.id}`, null, {
        params: { text: text },
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <InlineEditableItem
      value={proCon.text}
      editFunction={handleEditProCon}
      deleteFunction={() => deleteFunction(proCon.id)}
      className="h-full"
    />
  );
};

export default ProConItem;
