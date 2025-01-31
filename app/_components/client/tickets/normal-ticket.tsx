"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/authContext";
import { CLIENT_COLLECTOR_REQ, MAKE_TICKET_REQ } from "@/app/_utils/requests/client-requests-hub";
import Footer from "../../server/footer";
import MyButton from "../../templates/my-button";

export default function NormalTicketComponent() {
  const router = useRouter();
  const [data, setData] = useState({ subject: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [vaildationMessage, setVaildationMessage] = useState("");
  const authContext = useContext<any>(AuthContext);
  const { state } = authContext;

  const handeData = (type: "subject" | "body", value: string) => {
    setData({ ...data, [type]: value });
  };
  const handleSend = async () => {
    if (data.subject.length < 4) {
      setVaildationMessage("please inseart a subject which admin can understand your report.");
      return;
    }
    if (data.body.length < 15) {
      setVaildationMessage(`Description has to be more than 15 character.`);
      return;
    }
    setVaildationMessage("");
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(MAKE_TICKET_REQ, { type: `${state?.role}s`, data });
    if (response.done) {
      router.replace("/");
    } else {
      if (response.status === 401) {
        router.replace("/log-in");
      } else {
        setVaildationMessage(response?.message as string);
      }
    }
    setLoading(false);
  };
  return (
    <>
      <div className="w-full min-[500px]:w-[480px] px-mainX mx-auto">
        <div className="w-full card bg-gradient-to-b from-[#cdbc9a] to-[#AE9460] p-10 rounded-lg my-8">
          <div className="title">
            <h1 className="font-bold text-center text-3xl mb-3">Report</h1>
          </div>
          <div className="form mt-4">
            <div className="mt-4 w-full">
              <label className="text-mainlight text-base block mb-1">subject</label>
              <input
                value={data.subject}
                onChange={(e) => handeData("subject", e.target.value)}
                name="subject"
                type="text"
                required
                className="w-full bg-transparent placeholder:text-anotherLight focus:placeholder:text-mainlight text-sm text-mainlight border-b duration-300 border-anotherLight focus:border-mainlight px-2 py-3 outline-none"
                placeholder="Enter subject"
              />
            </div>

            <div className="text-sm flex flex-col mt-3">
              <label htmlFor="description" className="font-bold mt-4 mb-2 text-base">
                Description
              </label>
              <textarea
                value={data.body}
                onChange={(e) => handeData("body", e.target.value)}
                id="message"
                className="block min-h-[160px] max-h-[220px] p-2.5 w-full text-sm text-mainlight bg-transparent border-b border-anotherLight focus:border-mainlight outline-0 placeholder:text-anotherLight focus:placeholder:text-mainlight"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
          </div>

          <div className="submit w-full mt-4">
            <MyButton
              buttonColors="bg-mainlight text-maindark mx-auto w-[140px]"
              say="Send Report"
              loading={loading}
              clickFunc={handleSend}
              vaildationMessage={vaildationMessage}
              vaildationMessageWidth="mx-auto"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
