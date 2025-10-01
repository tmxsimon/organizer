import { useEffect, useRef } from "react";

type InlineEditableProps = {
  value: string;
  isEditMode: boolean;
  onValueChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  href?: string;
  className?: string;
  classNameText?: string;
};

const InlineEditable = ({
  value,
  isEditMode,
  onValueChange,
  onKeyDown,
  href,
  className = "",
  classNameText = "",
  ...inputProps
}: InlineEditableProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) inputRef.current?.focus();
  }, [isEditMode]);

  return (
    <div className={`flex h-full w-full items-center ${className}`}>
      {isEditMode ? (
        <input
          className={`w-full ${classNameText}`}
          ref={inputRef}
          onChange={(e) => onValueChange(e.target.value)}
          onKeyDown={onKeyDown}
          value={value}
          {...inputProps}
        />
      ) : href ? (
        <a
          href={href}
          className={`flex h-full w-full items-center overflow-hidden hover:underline ${classNameText}`}
        >
          {value}
        </a>
      ) : (
        <span className={`w-full overflow-hidden ${classNameText}`}>
          {value}
        </span>
      )}
    </div>
  );
};

export default InlineEditable;
