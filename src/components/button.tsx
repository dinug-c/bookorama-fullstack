import React from "react";

interface buttonProps {
  text: string;
}

export default function ButtonCustom({ text }: buttonProps) {
  return (
    <div className="mt-5 w-[100px] rounded-md bg-blue-500 px-5 py-3 text-center font-semibold text-white shadow-md hover:scale-105 hover:bg-blue-600">
      {text}
    </div>
  );
}
