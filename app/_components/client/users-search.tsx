"use client";
import {
  CLIENT_COLLECTOR_REQ,
  DASHBOARD_ONE_USER_REQ,
} from "@/app/_utils/requests/client-requests-hub";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

export default function UsersSearch() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [vaildationMessage, setVaildationMessage] = useState("");
  const handleSearch = async () => {
    if (loading) return;
    if (email.length === 0) {
      setVaildationMessage(`Insert a email to search.`);
      return;
    }
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      setVaildationMessage(`Not vaild email.`);
      return;
    }
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(DASHBOARD_ONE_USER_REQ, {
      body: { user_email: email },
    });
    if (response.done) {
      router.push(`/dashboard/users/${response?.data.email}`);
      setVaildationMessage("");
    } else {
      setVaildationMessage(response.message);
    }
    setLoading(false);
  };
  return (
    <>
      <div className="relative">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${
            vaildationMessage === ""
              ? "focus:border-maindark border-seclight placeholder:text-seclight"
              : "border-[#ff0000] placeholder:text-[red]"
          } focus:placeholder:text-maindark caret-maindark text-maindark w-full bg-transparent text-sm border rounded-md pl-3 pr-28 py-2 transition duration-200 ease outline-0`}
          placeholder="Enter email address"
        />
        <button
          onClick={handleSearch}
          className={`${
            loading ? "animate-pulse" : ""
          } absolute top-1 right-1 flex items-center gap-1 rounded bg-seclight hover:bg-maindark py-1 px-2.5 border border-transparent text-center text-sm duration-200`}
        >
          {loading ? <HiDotsHorizontal className="text-xl mx-3" /> : `Search`}
        </button>
      </div>
      <p className="text-xs text-[red] max-w-[350px] mt-1 ms-1">{vaildationMessage}</p>
    </>
  );
}
