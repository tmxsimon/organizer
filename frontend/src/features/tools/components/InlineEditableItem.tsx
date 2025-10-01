import { useState, type ReactNode } from "react";
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
  editFn: (value: string) => void;
  deleteFn: () => void;
  href?: string;
  size?: keyof typeof sizeMap;
  extraButtons?: ReactNode;
  className?: string;
  classNameInlineEditable?: string;
  classNameText?: string;
};

const InlineEditableItem = ({
  value,
  editFn,
  deleteFn,
  href,
  size = "md",
  extraButtons,
  className = "",
  classNameInlineEditable = "",
  classNameText = "",
  ...inputProps
}: InlineEditableItemProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [text, setText] = useState<string>(value);

  const handleOnClickEdit = () => {
    if (isEditMode) {
      editFn(text);
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
        onValueChange={setText}
        onKeyDown={handleOnKeyDown}
        className={classNameInlineEditable}
        classNameText={classNameText}
        {...inputProps}
      />
      <div className="gap-base-s ml-2 flex h-8 items-center">
        <button className="h-full cursor-pointer" onClick={deleteFn}>
          <Icon name="delete" />
        </button>
        <button className="h-full cursor-pointer" onClick={handleOnClickEdit}>
          {isEditMode ? <Icon name="check" /> : <Icon name="edit" />}
        </button>
        {extraButtons}
      </div>
    </div>
  );
};

export default InlineEditableItem;
