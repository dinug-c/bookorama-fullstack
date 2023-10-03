import { Danger } from "iconsax-react";
import React from "react";

interface ErrorCardProps {
  text: string;
}

export default function ErrorCard({ text }: ErrorCardProps) {
  return (
    <>
      <p className="mt-3 flex flex-row rounded-md bg-red-100 px-5 py-3 text-red-500 ">
        <Danger className="mr-2 inline-block" />
        {text}
      </p>
    </>
  );
}
