import PostSkeleton from "../skeletons/post-skeleton";
import { HOME_POSTS_SERVER_REQ } from "@/app/_utils/requests/server-requests-hub";
import HomePosts from "../client/home-posts";

export default async function Posts({ searchParams }: { searchParams: any }) {
  const response = await HOME_POSTS_SERVER_REQ(searchParams);
  if (response?.done) {
    return <HomePosts data={response.data} />;
  } else {
    return (
      <div className="flex flex-wrap w-full gap-2 animate-pulse">
        <PostSkeleton />
      </div>
    );
  }
}
