import { ChangeEvent, useRef } from "react";

type InputType = {
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
};
export const FormInput = ({
  onChange,
  value,
  placeholder,
  name,
  label,
}: InputType) => {
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={inputWrapperRef}
      className="w-full px-4 py-2 flex flex-col gap-1 border border-gray-300 text-gray-500 rounded"
    >
      <label className="capitalize text-sm">{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="outline-none text-gray-700 w-full"
        onFocus={() => {
          if (inputWrapperRef?.current) {
            inputWrapperRef.current.classList.add("border-sky-700");
          }
        }}
        onBlur={() => {
          if (inputWrapperRef?.current) {
            inputWrapperRef.current.classList.remove("border-sky-700");
          }
        }}
      />
    </div>
  );
};
