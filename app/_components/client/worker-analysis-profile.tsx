import {
  SERVER_COLLECTOR_REQ,
  WORKERS_SERVICES_DETAILS_SERVER_REQ,
} from "@/app/_utils/requests/server-requests-hub";
import { FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
export default async function WorkerAnalysis() {
  const response = await SERVER_COLLECTOR_REQ(WORKERS_SERVICES_DETAILS_SERVER_REQ);
  return (
    <div
      className={`flex flex-col gap-[50px] md:flex-row md:gap-0 md:justify-between border-b border-t py-4 md:py-8 lg:grid-cols-4 xl:gap-16 mb-6`}
    >
      <div className="flex flex-col justify-center items-center">
        <FaShoppingCart className="text-[26px] mb-2 text-mainlight" />
        <h3 className="mb-2 text-mainlight text-nowrap">Total completed services</h3>
        <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
          {response?.data?.totalCompletedServices}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <GiCash className="text-[30px] mb-2 text-mainlight" />
        <h3 className="mb-2 text-mainlight text-nowrap">Total profits without commission</h3>
        <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
          {response?.data?.totalMoneyWithBenfits}$
        </span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <FaDollarSign className="text-[30px] mb-2 text-mainlight" />
        <h3 className="mb-2  text-mainlight text-nowrap">Total profits with commission</h3>
        <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
          {response?.data?.totalMoneyWithoutBenfits}$
        </span>
      </div>
    </div>
  );
}
