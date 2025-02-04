"use client";
import Footer from "@/app/_components/server/footer";
import MyButton from "@/app/_components/templates/my-button";
import { BOOK_REQ, CLIENT_COLLECTOR_REQ } from "@/app/_utils/requests/client-requests-hub";
import { BaseImagesLink } from "@/app/base";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OrderNowComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const businessId = pathname.split("/")[2];
  const paramsObject = Object.fromEntries(searchParams.entries());
  const [fromTime, setFromTime] = useState("AM");
  const [toTime, setToTime] = useState("AM");
  const [inp, setInp] = useState({ from: "", to: "", day: "" });
  const [vaildationMessage, setVaildationMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleInp = (type: string, value: string) => {
    setInp({ ...inp, [type]: value });
  };

  const handleHours = () => {
    const from = fromTime === "PM" ? +inp.from + 12 : +inp.from;
    const to = toTime === "PM" ? +inp.to + 12 : +inp.to;
    return Math.abs(to - from) == 0 ? 24 : Math.abs(to - from);
  };

  const handleSend = async (e: any) => {
    e.preventDefault();
    if (loading) return;
    if (inp.to === "" || inp.from === "" || inp.day === "") {
      setVaildationMessage("Please select the booking date.");
      return;
    }
    const day = inp.day.split("-").reverse().join("-");
    const from = inp.from + fromTime;
    const to = inp.to + toTime;
    setLoading(true);
    setVaildationMessage("");
    const response = await CLIENT_COLLECTOR_REQ(BOOK_REQ, {
      id: businessId,
      data: { day, from, to },
    });
    setLoading(false);
    if (response.done) {
      router.push("/");
    } else {
      if (response.status === 401) {
        router.replace("/log-in");
      } else {
        setVaildationMessage(response?.message as string);
      }
    }
  };
  return (
    <>
      <div className="flex max-w-[640px] flex-col min-h-[calc(100dvh-94px)] gap-2 w-full px-mainX">
        <div className="w-full flex flex-col bg-gradient-to-tr from-[#AE9460] to-[#cdbc9a] p-3 rounded-xl">
          <div className="w-full aspect-video relative">
            <Image
              className="rounded-xl"
              fill
              src={`${BaseImagesLink}/uploads/${paramsObject.image}`}
              alt={paramsObject.title}
            />
          </div>
          <h1 className="text-anotherLight mt-2 px-2 font-bold flex justify-between">
            <span>{paramsObject.title}</span>
            <span>
              {paramsObject.price} <span className="text-[9px]">per hour</span>
            </span>
          </h1>
        </div>

        <div className="mt-3">
          <div className="w-full flex flex-wrap gap-2 items-center justify-self-end items-center justify-center">
            <div className="w-[65px] h-[60px] text-maindark relative">
              <input
                value={inp.from}
                onChange={(e) => {
                  handleInp(
                    "from",
                    +e.target.value <= 12 && +e.target.value >= 0 ? e.target.value : ""
                  );
                }}
                placeholder="From"
                type="number"
                className="placeholder:text-maindark placeholder:text-xs outline-0 pl-2 h-full border border-maindark bg-seclightblur text-maindark rounded-md w-full"
              />
              <div
                onClick={() => setFromTime("AM")}
                className={`duration-200 cursor-pointer absolute right-[2px] top-[4px] text-[9px] rounded-md p-1 border border-maindark ${
                  fromTime === "AM" ? "text-mainlight bg-maindark" : "text-maindark bg-transparent"
                }`}
              >
                AM
              </div>
              <div
                onClick={() => setFromTime("PM")}
                className={`duration-200 cursor-pointer absolute right-[2px] bottom-[4px] text-[9px] rounded-md p-1 border border-maindark ${
                  fromTime === "PM" ? "text-mainlight bg-maindark" : "text-maindark bg-transparent"
                }`}
              >
                PM
              </div>
            </div>
            <div className="w-[60px] h-[60px] text-maindark relative">
              <input
                value={inp.to}
                onChange={(e) => {
                  handleInp(
                    "to",
                    +e.target.value <= 12 && +e.target.value >= 0 ? e.target.value : ""
                  );
                }}
                placeholder="To"
                type="number"
                className="placeholder:text-maindark placeholder:text-xs outline-0 pl-2 h-full border border-maindark bg-seclightblur text-maindark rounded-md w-full"
              />
              <div
                onClick={() => setToTime("AM")}
                className={`duration-200 cursor-pointer absolute right-[2px] top-[4px] text-[9px] rounded-md p-1 border border-maindark ${
                  toTime === "AM" ? "text-mainlight bg-maindark" : "text-maindark bg-transparent"
                }`}
              >
                AM
              </div>
              <div
                onClick={() => setToTime("PM")}
                className={`duration-200 cursor-pointer absolute right-[2px] bottom-[4px] text-[9px] rounded-md p-1 border border-maindark ${
                  toTime === "PM" ? "text-mainlight bg-maindark" : "text-maindark bg-transparent"
                }`}
              >
                PM
              </div>
            </div>
            <input
              onChange={(e) => handleInp("day", e.target.value)}
              type="date"
              className="block max-w-[120px] bg-maindark text-mainlight text-sm rounded-lg outline-0 block w-full ps-10 p-2.5"
              placeholder="Select date"
              min={
                new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]
              }
            />
          </div>
        </div>
        <div className="text-maindark text-sm text-center">
          {inp.from && `From: ${inp.from + fromTime}`} {inp.to && `To: ${inp.to + toTime}`}{" "}
          {inp.day && `Day: ${inp.day}`}{" "}
        </div>
        {inp.from && inp.to && (
          <div className="text-maindark text-sm text-center">
            {inp.from && inp.to && handleHours()}hour for {handleHours() * +paramsObject.price}
            dollar
          </div>
        )}
        <MyButton
          buttonColors="bg-secdark text-mainlight mx-auto"
          say="Book"
          loading={loading}
          clickFunc={handleSend}
          vaildationMessage={vaildationMessage}
          vaildationMessageWidth="mx-auto"
        />
        <p className="text-xs text-maindarkblur text-center mt-2">
          You will now book an appointment with the tour guide and wait for the guide’s approval. If
          he approves, a notification will be sent to you via email to confirm the reservation by
          paying. You have the right to cancel at any time before confirming the reservation.
        </p>
      </div>
      <Footer />
    </>
  );
}
