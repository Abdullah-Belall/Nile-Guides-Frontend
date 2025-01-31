"use client";
import { useEffect, useState } from "react";
import PostCard from "./post-card";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import { CLIENT_COLLECTOR_REQ, UPDATE_POST_REQ } from "@/app/_utils/requests/client-requests-hub";

export default function WorkerPost({ item }: any) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(item.pause);

  const [isExpanded, setIsExpanded] = useState(false);
  const [allDes, setAllDes] = useState("");
  const [partDes, setPartDes] = useState<any>(null);
  useEffect(() => {
    if (item?.message) {
      setAllDes(item.message);
      setPartDes(item.message.length > 30 ? item.message.slice(0, 60) + "..." : null);
    } else {
      setAllDes("No message");
    }
  }, [item]);
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePostAction = async () => {
    if (loading) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(UPDATE_POST_REQ, {
      data: { pause: !status },
      id: item.id,
    });
    if (response.done) setStatus(!status);
    setLoading(false);
  };
  return (
    <>
      <div className="flex justify-between items-center w-full mb-2 px-3">
        <div className="text-base flex flex-col items-center">
          Status{" "}
          <span
            className={`text-center text-xs sm:text-sm px-2 py-0.5 rounded-md w-fit px-3 ${
              status ? `bg-yellow-900 text-yellow-300` : "bg-green-900 text-green-300"
            }`}
          >
            {!status ? "Active" : "Paused"}
          </span>
        </div>
        <div className="text-base flex flex-col items-center">
          Policy Status{" "}
          <span
            className={`text-center text-xs sm:text-sm px-2 py-0.5 rounded-md w-fit px-3 ${
              item.admin_accept === "pending" && `bg-yellow-900 text-yellow-300`
            } ${
              item.admin_accept === "cancelled"
                ? "bg-red-900 text-red-300"
                : "bg-green-900 text-green-300"
            }`}
          >
            {item.admin_accept !== "pending"
              ? item.admin_accept === "cancelled"
                ? "Refused"
                : "Active"
              : "Pending"}
          </span>
        </div>
      </div>
      <button
        onClick={toggleText}
        onBlur={() => setIsExpanded(false)}
        className={`w-full text-start px-3 min-h-[64px] ${!partDes && "cursor-text"}`}
      >
        <h2 className={`cursor-default font-semibold`}>Admin Message : </h2>
        <p className="text-sm">{isExpanded ? allDes : partDes ?? allDes}</p>
      </button>
      <PostCard
        id={item.id}
        title={item.title}
        img={item.image}
        price={item.price}
        rate={item.rate}
      />
      <div className="w-full flex gap-2 mt-3">
        <button
          onClick={handlePostAction}
          className={`${loading ? "animate-pulse" : ""}  ${
            !status ? `bg-yellow-900 text-yellow-300` : "bg-green-900 text-green-300"
          } outline-0 w-full h-[40px] text-center px-5 py-2 font-semibold rounded-md shadow-md flex justify-center items-center`}
        >
          {loading ? <HiDotsHorizontal className="text-3xl" /> : status ? "Active" : "Pause"}
        </button>
        <Link
          className="w-[40%] text-secdark bg-mainlight text-center px-5 py-2 font-semibold rounded-md shadow-md"
          href={`/posts/edit-post/${item.id}`}
        >
          Edit
        </Link>
      </div>
    </>
  );
}
