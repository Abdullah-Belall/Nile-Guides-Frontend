import { checkDateStatus } from "@/app/_utils/common/functions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { IoCheckmark } from "react-icons/io5";
import { TbProgressHelp } from "react-icons/tb";

export default function OrderDashboard({
  businessId,
  email,
  day,
  from,
  to,
  price,
  guideOpinin,
  clientPaid,
  status,
  companyPaid,
}: {
  businessId: string;
  email: string;
  day: string;
  from: string;
  to: string;
  price: number;
  guideOpinin: string;
  clientPaid: number;
  status: string;
  companyPaid: number;
}) {
  const [status_, setStatus] = useState(status);

  useEffect(() => {
    if (status_ === "pending") {
      let finalStatus;
      const checkDate = checkDateStatus(to.trim() + " " + day.trim());
      if (!checkDate) {
        finalStatus = guideOpinin === "pending" || Number(clientPaid) <= 0 ? "cancelled" : "done";
      } else {
        finalStatus = "pending";
      }
      setStatus(finalStatus);
    }
  }, []);
  return (
    <>
      <dl className="w-[50%] sm:w-full">
        <dt className="text-base font-medium text-seclight">Post Id:</dt>
        <dd className="mt-1.5 text-base font-semibold text-mainlight truncate">
          <Link href={`/posts/${businessId}`} className="hover:underline text-nowrap text-xs">
            {businessId}
          </Link>
        </dd>
      </dl>

      <dl className="w-[50%] sm:w-full">
        <dt className="text-base font-medium text-seclight text-nowrap">Guide email:</dt>
        <dd className="mt-1.5 text-base font-semibold text-mainlight text-nowrap">
          <Link className={`hover:underline no-underline`} href={`/dashboard/users/${email}`}>
            {email}
          </Link>
        </dd>
      </dl>

      <dl className="w-[50%] sm:w-full">
        <dt className="text-base font-medium text-seclight">Day:</dt>
        <dd className="mt-1.5 text-base font-semibold text-mainlight text-nowrap">{day}</dd>
      </dl>

      <dl className="w-[50%] sm:w-full">
        <dt className="text-base font-medium text-seclight">From:</dt>
        <dd className="mt-1.5 text-base font-semibold text-mainlight text-nowrap">{from}</dd>
      </dl>

      <dl className="w-[50%] sm:w-full">
        <dt className="text-base font-medium text-seclight">To:</dt>
        <dd className="mt-1.5 text-base font-semibold text-mainlight text-nowrap">{to}</dd>
      </dl>

      <dl className="w-[50%] sm:w-full">
        <dt className="text-base font-medium text-seclight text-nowrap">Total price:</dt>
        <dd className="mt-1.5 text-base font-semibold text-mainlight text-nowrap">${price}</dd>
      </dl>

      <dl className="w-[50%] sm:w-full">
        <dt className="text-base font-medium text-seclight text-nowrap">client paid:</dt>
        <dd className="mt-1.5 text-base font-semibold text-mainlight text-nowrap">${clientPaid}</dd>
      </dl>

      <dl className="w-[50%] sm:w-full">
        <dt className="text-sm font-medium text-seclight text-nowrap">Guide&lsquo;s decision:</dt>
        {guideOpinin === "pending" && (
          <dd className="me-2 mt-1.5 inline-flex shrink-0 items-center rounded px-2.5 py-0.5 text-xs font-medium bg-yellow-900 text-yellow-300">
            <TbProgressHelp className="mr-1" />
            Pending
          </dd>
        )}
        {/* 2 */}
        {guideOpinin === "cancelled" && (
          <dd className="mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium bg-red-900 text-red-300">
            <ImCancelCircle className="mr-1 text-sm" />
            Refused
          </dd>
        )}
        {/* 3 */}
        {guideOpinin === "done" && (
          <dd className="mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium bg-green-900 text-green-300">
            <IoCheckmark className="mr-1 text-base" />
            Accepted
          </dd>
        )}
      </dl>
      <dl className="w-[50%] sm:w-full">
        <dt className="text-base font-medium text-seclight">Status:</dt>
        {status_ === "pending" && (
          <dd className="me-2 mt-1.5 inline-flex shrink-0 items-center rounded px-2.5 py-0.5 text-xs font-medium bg-yellow-900 text-yellow-300">
            <TbProgressHelp className="mr-1" />
            Pending
          </dd>
        )}
        {/* 2 */}
        {status_ === "cancelled" && (
          <dd className="mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium bg-red-900 text-red-300">
            <ImCancelCircle className="mr-1 text-sm" />
            Cancelled
          </dd>
        )}
        {/* 3 */}
        {status_ === "done" && (
          <dd className="mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium bg-green-900 text-green-300">
            <IoCheckmark className="mr-1 text-base" />
            Completed
          </dd>
        )}
      </dl>
      <dl className="w-[50%] sm:w-full">
        <dt className="text-sm font-medium text-seclight text-nowrap">Money transfer:</dt>$
        {companyPaid}
      </dl>
    </>
  );
}
