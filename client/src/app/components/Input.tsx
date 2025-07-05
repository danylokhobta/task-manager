import { useState, useRef } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type InputType = {
  value: string;
  placeholder: string;
  blured?: boolean;
  setValue?: (value: string) => void;
  inputFormProps?: UseFormRegisterReturn;
  error?: FieldError;
};

const Input = ({ value, blured, placeholder, setValue, inputFormProps, error }: InputType) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  return blured ? (
    <>
      <div className="relative cursor-text" onClick={handleFocus}>
        <input
          {...inputFormProps}
          ref={(e) => {
            inputFormProps?.ref(e); // Attach react-hook-form ref
            inputRef.current = e; // Assign custom ref
          }}
          type={isFocused ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            inputFormProps?.onChange(e); // Trigger react-hook-form onChange
            if (setValue) {
              setValue(e.target.value);
            } // Trigger custom onChange
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            inputFormProps?.onBlur?.(e); // Trigger react-hook-form onBlur
          }}
          className="w-full p-2.5 outline-0 bg-gray-100 text-2xl font-bold placeholder:font-normal focus:bg-gray-200 z-0"
        />
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 bg-black/10 z-10 ${
            (isFocused || value.length === 0) && "hidden"
          }`}
          style={{ pointerEvents: "none" }}
        >
          <div className="relative h-full w-full backdrop-blur-[4px]" />
        </div>
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  ) : (
    <>
      <input
        {...inputFormProps}
        ref={(e) => {
          inputFormProps?.ref(e); // Attach react-hook-form ref
          inputRef.current = e; // Assign custom ref
        }}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          inputFormProps?.onChange(e); // Trigger react-hook-form onChange
          if (setValue) {
            setValue(e.target.value);
          } // Trigger custom onChange
        }}
        onBlur={(e) => inputFormProps?.onBlur?.(e)} // Trigger react-hook-form onBlur
        className="w-full p-2.5 outline-0 bg-gray-100 text-2xl font-bold placeholder:font-normal focus:bg-gray-200"
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  );
};

export default Input;
