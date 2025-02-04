"use client";
import { useEffect, useState } from "react";
import UserCard from "../templates/user-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter, useSearchParams } from "next/navigation";

export default function UsersDashboard({
  data,
}: {
  data: { data: any; total: number; lastPage: number; page: number };
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
      className="flex flex-wrap my-2 gap-2"
      dataLength={data_.length}
      next={() => NextPage()}
      hasMore={data_.length < data.total}
      loader={<h1 className="w-fit mx-auto text-secdark">Loading...</h1>}
    >
      {!data_ || data.total == 0 ? (
        <h1
          className={`absolute left-[50%] top-[55%] translate-x-[-50%] translate-y-[-50%] w-fit bg-seclightblur mx-auto py-3 px-5 rounded-md font-semibold`}
        >
          No users
        </h1>
      ) : (
        <>
          {data_?.map((e: any, i: number) => (
            <div
              key={e.id + i}
              className="w-full min-[570px]:w-[calc(50%-4px)] lg:w-[calc(100%/3-6px)] xl:w-[calc(25%-6px)]"
            >
              <UserCard
                avatar={e.avatar}
                name={e.first_name + " " + e.last_name}
                role={e.role}
                email={e.email}
                gender={e.gender}
                age={e.age}
              />
            </div>
          ))}
        </>
      )}
    </InfiniteScroll>
  );
}
