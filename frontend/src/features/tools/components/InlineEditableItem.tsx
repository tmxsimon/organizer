import { useState } from "react";
import Icon from "../../../components/Icon";
import InlineEditable from "../../../components/InlineEditable";

const sizeMap = {
  sm: "h-8",
  md: "h-12",
  lg: "h-18",
  xl: "h-24",
};

type InlineEditableItemProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  value: string;
  editFunction: (value: string) => void;
  deleteFunction: () => void;
  href?: string;
  size?: keyof typeof sizeMap;
  className?: string;
  classNameInlineEditable?: string;
  classNameText?: string;
};

const InlineEditableItem = ({
  value,
  editFunction,
  deleteFunction,
  href,
  size = "md",
  className = "",
  classNameInlineEditable = "",
  classNameText = "",
}: InlineEditableItemProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [text, setText] = useState<string>(value);

  const handleOnClickEdit = () => {
    if (isEditMode) {
      editFunction(text);
    }
    setIsEditMode(!isEditMode);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleOnClickEdit();
    }
  };

  return (
    <div
      className={`bg-main flex w-full items-center justify-between ${sizeMap[size]} ${className}`}
    >
      <InlineEditable
        href={href}
        value={text}
        isEditMode={isEditMode}
        onChange={setText}
        onKeyDown={handleOnKeyDown}
        className={classNameInlineEditable}
        classNameText={classNameText}
      />
      <div className="ml-2 flex h-full items-center gap-2">
        <button className="h-8 cursor-pointer" onClick={deleteFunction}>
          <Icon name="delete" />
        </button>
        <button className="h-8 cursor-pointer" onClick={handleOnClickEdit}>
          {isEditMode ? <Icon name="check" /> : <Icon name="edit" />}
        </button>
      </div>
    </div>
  );
};

export default InlineEditableItem;
