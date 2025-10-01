import type { ProConType } from "../types";
import InlineEditableItem from "../../components/InlineEditableItem";

type ProConItemProps = React.InputHTMLAttributes<HTMLInputElement> & {
  proCon: ProConType;
  editFn: (data: { id: number; text: string }) => void;
  deleteFn: (id: number) => void;
};

const ProConItem = ({ proCon, editFn, deleteFn }: ProConItemProps) => {
  return (
    <InlineEditableItem
      value={proCon.text}
      editFn={(text: string) => editFn({ id: proCon.id, text: text })}
      deleteFn={() => deleteFn(proCon.id)}
      className="h-full"
    />
  );
};

export default ProConItem;
