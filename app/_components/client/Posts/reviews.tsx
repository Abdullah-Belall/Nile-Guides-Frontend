"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RateCard from "../../templates/rate-card";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReviewsComponent({
  data_,
}: {
  data_: { total: number; page: number; lastPage: number; data: any };
}) {
  const [data, setData] = useState([data_?.data]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || 1;
  useEffect(() => {
    router.replace(window.location.pathname + "?" + "page=1");
  }, []);
  useEffect(() => {
    if (data_.page == 1) {
      setData(data_.data);
    } else {
      setData([...data, ...data_.data]);
    }
  }, [data_.page, data_.data]);
  const NextPage = () => {
    if (page) {
      router.replace(window.location.pathname + "?" + `page=${+page + 1}`, { scroll: false });
    } else {
      router.replace(window.location.pathname + "?" + "page=2", { scroll: false });
    }
  };
  return (
    <InfiniteScroll
      className="flex flex-wrap gap-2"
      dataLength={data.length}
      next={() => NextPage()}
      hasMore={data.length < data_.total}
      loader={<h1 className="w-fit mx-auto text-secdark">Loading...</h1>}
    >
      {data?.length > 0 ? (
        data?.map((e, i) => {
          return (
            <div key={e.id + "fs" + i} className="w-full min-[680px]:w-[calc(50%-4px)]">
              <RateCard
                author={{
                  name: e?.client?.first_name + " " + e?.client?.last_name,
                  avatar: e?.client?.avatar,
                  gender: e?.client?.gender,
                }}
                rate={e?.rating}
                text={e?.text ?? ""}
                date={e?.created_at}
              />
            </div>
          );
        })
      ) : (
        <h1 className={`w-fit bg-seclightblur mx-auto py-3 px-5 rounded-md font-semibold`}>
          No Reviews
        </h1>
      )}
    </InfiniteScroll>
  );
}
