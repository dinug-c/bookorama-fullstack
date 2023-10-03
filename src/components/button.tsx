import React from "react";

interface buttonProps {
  text: string;
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  onClick?: () => void;
}

export default function ButtonCustom({
  text,
  width,
  height,
  color,
  backgroundColor,
  hoverBackgroundColor,
  onClick,
}: buttonProps) {
  return (
    <button
      onClick={onClick}
      className={`mt-5 w-full h-[${height}] rounded-md ${backgroundColor} px-5 py-3 text-center font-semibold text-${color} shadow-md transition-all hover:scale-[1.01] ${
        "hover:" + hoverBackgroundColor
      }`}
      type="submit"
    >
      {text}
    </button>
  );
}
