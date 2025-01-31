import { unCountedMessage } from "@/app/_utils/interfaces/main";
import WorkersPostsForDashboard from "../templates/workers-posts-bashboard";
import {
  DASHBOARD_WORKER_POSTS_SERVER_REQ,
  SERVER_COLLECTOR_REQ,
} from "@/app/_utils/requests/server-requests-hub";

export default async function PostsSecDashboard({ email }: { email: string }) {
  const response = await SERVER_COLLECTOR_REQ(DASHBOARD_WORKER_POSTS_SERVER_REQ, {
    data: { email },
  });
  const businessData = response.data.data;
  if (response.done) {
    return (
      <section className="flex flex-col">
        <span className="bg-gradient-to-b from-[#AE9460] to-[#cdbc9a] w-full font-bold text-mainlight bg-maindark text-center rounded-md block py-2">
          Posts
        </span>
        <ul className="flex flex-wrap gap-3 mt-1">
          {response.data.total != 0 ? (
            businessData.map((business: any) => (
              <li
                key={business.id}
                className="w-full sm:w-[calc(50%-.75rem/2)] xl:w-[calc((100%/3)-.50rem)] 2xl:w-[calc((100%/4)-.57rem)]"
              >
                <WorkersPostsForDashboard
                  status={business.admin_accept}
                  businessId={business.id}
                  businessImage={business.image}
                  businessTitle={business.title}
                  businessPrice={business.price}
                  businessRate={+business.rate}
                  workerEmail={business.worker.email}
                  workerName={`${business.worker.first_name} ${business.worker.last_name}`}
                  workerGender={business?.worker?.gender}
                  workerAvatar={business?.worker?.avatar}
                />
              </li>
            ))
          ) : (
            <h1 className={`w-fit bg-seclight mx-auto py-3 px-5 rounded-md font-semibold`}>
              No Posts
            </h1>
          )}
        </ul>
      </section>
    );
  } else {
    <h1 className="text-maindark mx-auto">{unCountedMessage}</h1>;
  }
}
