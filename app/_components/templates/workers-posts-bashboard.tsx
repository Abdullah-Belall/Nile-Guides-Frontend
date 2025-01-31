"use client";
import Image from "next/image";
import PostCard from "./post-card";
import Link from "next/link";
import { useState } from "react";
import {
  CLIENT_COLLECTOR_REQ,
  DASHBOARD_POST_ACTIONS_REQ,
} from "@/app/_utils/requests/client-requests-hub";
import maleAvatar from "@/public/maleAvatar.png";
import femaleAvatar from "@/public/femaleAvatar.png";

export default function WorkersPostsForDashboard({
  status,
  businessId,
  businessImage,
  businessTitle,
  businessPrice,
  businessRate,
  workerEmail,
  workerName,
  workerGender,
  workerAvatar,
}: any) {
  const [message, setMessage] = useState("");
  const [vaildationMessage, setVaildationMessage] = useState("");
  const [status_, setStatus_] = useState(status);
  const [loading, setLoading] = useState(false);
  const handleSend = async (changeTo: string) => {
    if (loading) return;
    if (message.length < 5) {
      setVaildationMessage("Please provide a message.");
      return;
    }
    setLoading(true);
    setVaildationMessage("");
    const response = await CLIENT_COLLECTOR_REQ(DASHBOARD_POST_ACTIONS_REQ, {
      id: businessId,
      data: { changeTo, message },
    });
    if (response.done) {
      setStatus_(changeTo);
    } else {
      setVaildationMessage(response.message);
    }
    setLoading(false);
  };
  const imgCondition: any =
    workerAvatar && workerAvatar !== "" && workerAvatar !== "null"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${workerAvatar}`
      : workerGender === "male"
      ? maleAvatar
      : femaleAvatar;
  return (
    <div className="w-full flex flex-col bg-seclightblur border-2 border-maindark items-center p-4 rounded-md">
      <h1 className={`text-sm text-maindark mb-2`}>
        Status:{" "}
        <span
          className={`${
            status_ === "done"
              ? "bg-green-900 text-green-300"
              : status_ === "pending"
              ? "bg-yellow-900 text-yellow-300"
              : "bg-red-900 text-red-300"
          } px-2 rounded-md`}
        >
          {status_ === "done" ? "Active" : status_ === "pending" ? "Pending" : "Cancelled"}
        </span>
      </h1>
      <h1 className="text-sm text-maindark mb-2">Post ID: {businessId}</h1>
      <div className="relative w-full">
        <Link
          href={`/dashboard/posts/${businessId}`}
          className="absolute rounded-xl w-full h-full left-0 top-0 z-20"
        ></Link>
        <PostCard
          id={businessId}
          title={businessTitle}
          price={businessPrice}
          rate={businessRate}
          img={businessImage}
        />
      </div>
      <div className="w-full flex gap-3 p-2 border-[1px] border-secdark rounded-2xl mt-3">
        <div className="w-[100px] h-[100px] border-2 border-maindark rounded-2xl relative">
          <Image className={`rounded-2xl`} fill src={imgCondition} alt="worker avatar" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-maindark text-2xl font-semibold">{workerName}</div>
          <div className="text-maindark text-base md:text-xl">{workerGender}</div>
          <Link
            href={`/dashboard/users/${workerEmail}`}
            className="underline text-xs text-maindark hover:text-maindarkblur cursor-pointer hover:no-underline"
          >
            show more
          </Link>
        </div>
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say something to the worker"
        className="p-3 placeholder:text-maindark placeholder:text-sm my-2 w-full max-h-[100px] border-2 border-maindark rounded-md bg-transparent text-maindark outline-0"
      ></textarea>
      <p className="text-xs text-[red] max-w-[350px]">{vaildationMessage}</p>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => (status_ !== "done" ? handleSend("done") : "")}
          className={`${
            status_ === "done"
              ? "opacity-[.5] cursor-default"
              : "hover:bg-maindark hover:text-anotherLight"
          } duration-200 px-3 py-2 rounded-md border border-maindark text-maindark`}
        >
          Active
        </button>
        <button
          onClick={() => (status_ !== "cancelled" ? handleSend("cancelled") : "")}
          className={`${
            status_ === "cancelled"
              ? "opacity-[.5] cursor-default"
              : "hover:bg-maindark hover:text-anotherLight"
          } duration-200 px-3 py-2 rounded-md border border-maindark text-maindark`}
        >
          Disable
        </button>
      </div>
    </div>
  );
}
