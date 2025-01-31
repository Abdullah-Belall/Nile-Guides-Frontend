"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import WorkersPostsForDashboard from "../templates/workers-posts-bashboard";

export default function PostsPageDashboard({
  data,
}: {
  data: { data: any; total: number; page: number; lastPage: number };
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
      className="flex flex-wrap gap-3 mt-4"
      dataLength={data_.length}
      next={() => NextPage()}
      hasMore={data_.length < data.total}
      loader={<h1 className="w-fit mx-auto text-secdark">Loading...</h1>}
      endMessage={<h1 className="w-fit mx-auto text-secdark">No more posts</h1>}
    >
      {data.total > 0 ? (
        data_.map((business: any) => (
          <div
            key={business?.id}
            className="w-full sm:w-[calc(50%-.75rem/2)] xl:w-[calc((100%/3)-.50rem)] 2xl:w-[calc((100%/4)-.57rem)]"
          >
            <WorkersPostsForDashboard
              status={business?.admin_accept}
              businessId={business?.id}
              businessImage={business?.image}
              businessTitle={business?.title}
              businessPrice={business?.price}
              businessRate={+business?.rate}
              workerEmail={business?.worker?.email}
              workerName={`${business?.worker?.first_name} ${business?.worker?.last_name}`}
              workerGender={business?.worker?.gender}
              workerAvatar={business?.worker?.avatar}
            />
          </div>
        ))
      ) : (
        <h1 className="text-nowrap absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-fit bg-seclight mx-auto py-3 px-5 rounded-md font-semibold">
          No Posts
        </h1>
      )}
    </InfiniteScroll>
  );
}
