import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface TextFieldInputProps {
  register: UseFormRegister<FieldValues>;
  type: string;
  placeholder: string;
  name: string;
  icon?: React.ReactNode;
  value?: string;
  isDisabled?: boolean;
}

export default function TextFieldInput({
  register,
  type,
  placeholder,
  name,
  icon,
  value,
  isDisabled,
}: TextFieldInputProps) {
  return (
    <div className="mt-5">
      <label className="mt-5 font-semibold text-gray-500">{placeholder}</label>
      <div className="flex flex-row">
        {icon}
        <input
          className="mt-2 h-10 w-full rounded-md border border-gray-300 px-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type={type}
          // disabled={isDisabled}
          defaultValue={value}
          required
          {...register(name, { required: true })}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
