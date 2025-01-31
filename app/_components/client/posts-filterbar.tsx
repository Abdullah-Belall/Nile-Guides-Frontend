"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostsFilterBar({ param }: { param: "Active" | "Compleded" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("pending");
  useEffect(() => {
    router.push(window.location.pathname + `?status=${status}&page=1`, { scroll: false });
  }, [status]);
  return (
    <div className="w-full py-3 border-b-2 border-maindark flex justify-center items-center gap-3">
      <div
        onClick={() => setStatus("pending")}
        className={`border-2 border-maindark hover:bg-maindark text-sm md:text-base hover:text-mainlight px-3 py-1 md:px-4 md:py-2 rounded-full text-nowrap cursor-pointer h-fit duration-300 ${
          searchParams.toString().indexOf("status=pending") !== -1
            ? `bg-maindark text-mainlight`
            : `text-maindark`
        }`}
      >
        Pending
      </div>
      <div
        onClick={() => setStatus("done")}
        className={`border-2 border-maindark hover:bg-maindark text-sm md:text-base hover:text-mainlight px-3 py-1 md:px-4 md:py-2 rounded-full text-nowrap cursor-pointer h-fit duration-300 ${
          searchParams.toString().indexOf("status=done") !== -1
            ? `bg-maindark text-mainlight`
            : `text-maindark`
        }`}
      >
        {param}
      </div>
      <div
        onClick={() => setStatus("cancelled")}
        className={`border-2 border-maindark hover:bg-maindark text-sm md:text-base hover:text-mainlight px-3 py-1 md:px-4 md:py-2 rounded-full text-nowrap cursor-pointer h-fit duration-300 ${
          searchParams.toString().indexOf("status=cancelled") !== -1
            ? `bg-maindark text-mainlight`
            : `text-maindark`
        }`}
      >
        Cancelled
      </div>
    </div>
  );
}
