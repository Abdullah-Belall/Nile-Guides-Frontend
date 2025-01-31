"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import TicketsCard from "../templates/tickets-card";

export default function TicketsDashboard({
  data,
  currentUserRole,
}: {
  data: { data: any; total: number; page: number; lastPage: number };
  currentUserRole: string;
}) {
  const router = useRouter();
  const [data_, setData_] = useState<any>([]);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  useEffect(() => {
    if (data.page == 1) {
      setData_(data.data);
    } else {
      setData_([...data_, ...data.data]);
    }
  }, [data.page, data.data]);

  const NextPage = () => {
    const allFilterArray = searchParams.toString().split("&");
    const pageIndex = allFilterArray.findIndex((e) => e.includes("page"));
    allFilterArray[pageIndex] = `page=${+page + 1}`;
    router.push(window.location.pathname + "?" + allFilterArray.join("&"), { scroll: false });
  };
  return (
    <InfiniteScroll
      className="w-full flex flex-wrap gap-3 mt-2"
      dataLength={data_.length}
      next={() => NextPage()}
      hasMore={data_.length < data.total}
      loader={<h1 className="w-full text-center text-secdark">Loading...</h1>}
    >
      {data?.total !== 0 ? (
        data_?.map((e: any, i: any) => {
          const clientName = e?.client?.first_name + " " + e?.client?.last_name;
          const workerName = e?.worker?.first_name + " " + e?.worker?.last_name;
          const name = e?.client ? clientName : workerName;
          return (
            <div key={i} className="w-full lg:w-[calc(50%-.75rem/2)]">
              <TicketsCard
                ticketId={e?.id}
                role={"client"}
                userEmail={e?.client?.email || e.worker.email}
                userName={name}
                title={e?.subject}
                body={e?.body}
                image1={e?.image1}
                image2={e?.image2}
                image3={e?.image3}
                status={e?.status}
                date={e?.created_at}
                forWho={currentUserRole}
              />
            </div>
          );
        })
      ) : (
        <h1 className="text-nowrap absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-fit bg-seclight mx-auto py-3 px-5 rounded-md font-semibold">
          No Tickets
        </h1>
      )}
    </InfiniteScroll>
  );
}
