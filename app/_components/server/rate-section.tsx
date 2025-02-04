import { GET_POST_REVIEWS_SERVER_REQ } from "@/app/_utils/requests/server-requests-hub";
import AddRate from "../client/add-rate";
import ReviewsComponent from "../client/Posts/reviews";

export default async function RateSection({
  page,
  mostRated,
  rate,
  postId,
  text,
}: {
  page: number;
  mostRated: boolean;
  rate: number;
  postId: string;
  text: string;
}) {
  const response = await GET_POST_REVIEWS_SERVER_REQ({ id: postId, params: { page, mostRated } });
  const data = response.data.data ?? [];
  return (
    <div className="w-full mt-[100px]">
      <AddRate postId={postId} rate={rate ?? 0} text_={text ?? ""} />
      <div className="flex justify-between items-center py-3 border-b-2 border-maindark mb-2">
        <h1 className="text-maindark font-bold text-xl">Customer Reviews</h1>
        <div></div>
      </div>
      <ReviewsComponent data_={response.data} />
    </div>
  );
}
