"use client";
import { useState } from "react";

export default function Description({ desc }: { desc: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const allDes = desc;
  const partDes = desc.length > 60 ? desc.slice(0, 60) + "..." : null;
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      className={`text-sm md:text-base max-w-[200px] md:max-w-[320px] text-secdark overflow-hidden ${
        desc.length > 60 && "cursor-pointer"
      }`}
      onClick={toggleText}
    >
      {isExpanded ? allDes : partDes ?? allDes}
    </div>
  );
}
