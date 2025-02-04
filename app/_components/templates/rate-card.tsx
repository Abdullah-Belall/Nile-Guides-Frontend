"use client";
import Image from "next/image";
import maleAvatar from "@/public/maleAvatar.png";
import femaleAvatar from "@/public/femaleAvatar.png";
import { BaseImagesLink } from "@/app/base";
import StarsGenrator from "./stars-genrator";
import { useState } from "react";
import { handleCreatedDate } from "@/app/_utils/common/functions";

export default function RateCard({
  author,
  rate,
  text,
  date,
}: {
  author: { name: string; avatar: string | null; gender: "male" | "female" };
  rate: number;
  text: string;
  date: string;
}) {
  const maxText = text.length > 90 ? text.slice(0, 90) + "..." : text;
  const [showMore, setShowMore] = useState(false);
  const handleText = () => {
    if (text.length <= 90) return;
    setShowMore(!showMore);
  };
  const imgCondition: any =
    author?.avatar && author?.avatar !== "" && author?.avatar !== "null"
      ? `${BaseImagesLink}/uploads/${author?.avatar}`
      : author?.gender === "female"
      ? femaleAvatar
      : maleAvatar;
  return (
    <div className="relative h-[180px] p-3 pb-5 flex flex-col min-[400px]:flex-row gap-3 items-center rounded-md bg-seclightblur">
      <Image
        className="rounded-full border border-maindark"
        width={100}
        height={100}
        src={imgCondition}
        alt={author.name}
      />
      <div className="flex flex-col items-center min-[400px]:items-start">
        <h1 className="text-maindark mb-3 font-semibold text-nowrap">{author.name}</h1>
        <div className="flex gap-2 mb-3">
          <StarsGenrator rate={rate} />
        </div>
        <p
          onClick={handleText}
          className={`${text.length > 90 && "cursor-pointer"} text-secdark text-sm mb-3`}
        >
          {showMore ? text : maxText}
        </p>
      </div>
      <p className="text-xs absolute right-[8px] bottom-[5px] text-secdark">
        {handleCreatedDate(date as any)}
      </p>
    </div>
  );
}
