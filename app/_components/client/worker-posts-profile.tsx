import Link from "next/link";
import WorkerPost from "../templates/worker-post";

export default async function WorkerPostsProfile({ data }: any) {
  const workerPosts = data.data;
  return (
    <>
      <div className={`rounded-lg w-full px-4 py-5 my-4`}>
        <h3 className="flex justify-between items-center border-b-2 border-maindark py-3 mb-4 text-xl font-semibold text-maindark">
          <span className="mb-[-15px]">Your Posts</span>
          <Link
            href={"/posts/new-post"}
            className="px-4 py-2 text-base text-maindark bg-mainlight font-semibold rounded-md shadow-md w-fit"
          >
            New Post
          </Link>
        </h3>
        <h1
          className={`${
            workerPosts?.length !== 0 && "hidden"
          } w-fit bg-seclightblur mx-auto py-3 px-5 rounded-md font-semibold`}
        >
          You have no Posts
        </h1>
        <ul className="flex flex-wrap w-full gap-2">
          {workerPosts?.map((item: any, i: number) => (
            <li
              key={i}
              className={`w-full h-fit min-[610px]:w-[calc(50%-0.5rem/2)] lg:w-[calc(33.33%-.332rem)] xl:w-[calc(25%-.375rem)] bg-secdark rounded-lg p-2 py-3 flex flex-col items-center`}
            >
              <WorkerPost item={item} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
