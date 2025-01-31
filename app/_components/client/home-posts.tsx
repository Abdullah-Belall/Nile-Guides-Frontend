"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PostCard from "../templates/post-card";
import MyPagination from "../templates/pagination-bar";

export default function HomePosts({ data }: { data: any }) {
  const [posts, setPosts] = useState(data.data);
  const searchParams = useSearchParams();
  const page = searchParams
    .toString()
    .split("&")
    .find((item) => item.includes("page"))
    ?.split("=")[1];
  useEffect(() => {
    setPosts(data.data);
  }, [data]);

  return (
    <>
      <ul className="flex flex-wrap w-full gap-2">
        {posts.map((item: any, i: number) => (
          <li
            key={i}
            className={`w-full md:w-[calc(33.33%-.332rem)] lg:w-[calc(25%-.375rem)] min-[500px]:w-[calc(50%-0.5rem/2)]`}
          >
            <PostCard
              id={item.id}
              title={item.title}
              img={item.image}
              price={item.price}
              rate={item.rate}
            />
          </li>
        ))}
      </ul>
      <MyPagination pageNum={page ?? 1} totalPages={data.lastPage} />
    </>
  );
}
