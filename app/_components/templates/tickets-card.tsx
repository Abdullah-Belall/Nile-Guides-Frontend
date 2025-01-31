"use client";
import { handleCreatedDate } from "@/app/_utils/common/functions";
import {
  CLIENT_COLLECTOR_REQ,
  DASHBOARD_TICKET_ACTIONS_REQ,
} from "@/app/_utils/requests/client-requests-hub";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdCancel, MdHideImage } from "react-icons/md";

export default function TicketsCard({
  ticketId,
  role,
  userEmail,
  title,
  body,
  image1,
  image2,
  image3,
  date,
  userName,
  status,
  forWho,
}: any) {
  const [status_, setStatus_] = useState(status);
  const [loading, setLoading] = useState(false);
  const [[link, triger], setOpen] = useState(["", false]);
  useEffect(() => {
    setStatus_(status);
  }, [ticketId]);
  const handleOpretions = async (status2: "cancelled" | "done") => {
    if (loading) return;
    if (status_ === status2) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(DASHBOARD_TICKET_ACTIONS_REQ, {
      data: {
        ticket_id: ticketId,
        type: role,
        status: status2,
      },
    });
    if (response.done) {
      setStatus_(status2);
    }
    setLoading(false);
  };
  return (
    <>
      <div
        onClick={() => setOpen(["", false])}
        className={`${
          triger ? "" : "hidden"
        } fixed z-50 left-0 top-0 w-full h-dvh flex justify-center items-center bg-blackLayer`}
      >
        <div className="relative w-full min-[470px]:w-[450px] aspect-video rounded-md overflow-hidden mx-2">
          {link !== "" && <Image fill src={link} alt="Selected image" />}
        </div>
      </div>
      <div className="relative bg-secdark w-full relative block overflow-hidden rounded-lg p-4 sm:p-6 lg:p-8">
        <div className="flex w-full gap-1 mb-2">
          <div className="w-full firstImage relative overflow-hidden w-full aspect-video border-2 border-gray-300 border-dashed rounded-md text-mainlight bg-seclight flex justify-center items-center">
            {image1 === "" ? (
              <MdHideImage className="text-2xl" />
            ) : (
              <Image
                onClick={() =>
                  setOpen([`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image1}`, true])
                }
                className="cursor-pointer"
                fill
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image1}`}
                alt="ticket image one"
              />
            )}
          </div>
          <div className="w-full firstImage relative overflow-hidden w-full aspect-video border-2 border-gray-300 border-dashed rounded-md text-mainlight bg-seclight flex justify-center items-center">
            {image2 === "" ? (
              <MdHideImage className="text-2xl" />
            ) : (
              <Image
                onClick={() =>
                  setOpen([`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image2}`, true])
                }
                className="cursor-pointer"
                fill
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image2}`}
                alt="ticket image two"
              />
            )}
          </div>
          <div className="w-full firstImage relative overflow-hidden w-full aspect-video border-2 border-gray-300 border-dashed rounded-md text-mainlight bg-seclight flex justify-center items-center">
            {image3 === "" ? (
              <MdHideImage className="text-2xl" />
            ) : (
              <Image
                onClick={() =>
                  setOpen([`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image3}`, true])
                }
                className="cursor-pointer"
                fill
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image3}`}
                alt="ticket image three"
              />
            )}
          </div>
        </div>
        <div>
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-maindark via-anotherLight to-seclight"></span>
          <Link
            href={["client", "worker"].includes(forWho) ? "?" : `/dashboard/users/${userEmail}`}
            className="w-fit sm:flex sm:justify-between sm:gap-4"
          >
            <div className="flex flex-col w-fit">
              <h2 className="text-2xl font-bold text-mainlight lg:text-3xl">
                {title?.length > 30 ? title.slice(0, 31) : title}
              </h2>
              <h2
                className={`${
                  ["client", "worker"].includes(forWho) && "hidden"
                } mt-1 text-xs font-medium text-anotherLight lg:text-sm`}
              >
                By {userName}
              </h2>
            </div>
          </Link>
          <div className="mt-4">
            <p className="text-pretty text-sm text-mainlight lg:text-base">
              {body?.length > 130 ? body.slice(0, 131) : body}
            </p>
          </div>
          <dl className="mt-6 flex gap-4 sm:gap-6">
            <div className="flex flex-col">
              <dd className="text-xs text-anotherLight lg:text-base">{handleCreatedDate(date)}</dd>
              <dt
                className={`${
                  status_ === "done"
                    ? "bg-green-900 text-green-300"
                    : status_ === "pending"
                    ? "bg-yellow-900 text-yellow-300"
                    : "bg-red-900 text-red-300"
                } mt-1.5 rounded px-2.5 py-0.5 text-xs sm:text-sm w-fit font-medium`}
              >
                {status_.charAt(0).toUpperCase() + status_.slice(1)}
              </dt>
            </div>
          </dl>
        </div>
        <div className={`${["client", "worker"].includes(forWho) && "hidden"} mt-3 flex gap-2`}>
          <button
            onClick={() => handleOpretions("done")}
            type="button"
            className={`${loading ? "animate-pulse" : ""} ${
              status_ === "done"
                ? "opacity-[.5] cursor-default"
                : "hover:text-seclight hover:bg-mainlight"
            } min-w-[125px] text-center border border-mainlight rounded-lg px-3 py-2 duration-200`}
          >
            {loading ? (
              <HiDotsHorizontal className="text-3xl mx-auto" />
            ) : (
              <span
                className={`w-full flex justify-between items-center ${loading ? "hidden" : ""}`}
              >
                Completed
                <MdCancel className="text-[18px] ml-1" />
              </span>
            )}
          </button>
          <button
            onClick={() => handleOpretions("cancelled")}
            type="button"
            className={`${loading ? "animate-pulse" : ""} ${
              status_ === "cancelled"
                ? "opacity-[.5] cursor-default"
                : "hover:text-seclight hover:bg-mainlight"
            } min-w-[125px] text-center border border-mainlight rounded-lg px-3 py-2 duration-200`}
          >
            {loading ? (
              <HiDotsHorizontal className="text-3xl mx-auto" />
            ) : (
              <span
                className={`w-full flex justify-between items-center ${loading ? "hidden" : ""}`}
              >
                Canceled
                <MdCancel className="text-[18px] ml-1" />
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
