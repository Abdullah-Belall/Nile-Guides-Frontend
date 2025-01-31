"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/ui/posts.module.css";
import Link from "next/link";
import ClientOrders from "../templates/client-orders";
import WorkerService from "../templates/worker-service";
import { useRouter } from "next/navigation";
import { handleCreatedDate, handleHours } from "@/app/_utils/common/functions";

export default function OrdersOrServices({ data_, role, forP }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState<any>(true);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (page > 1) {
      router.replace(window.location.pathname + `?page=${page}`, { scroll: false });
    }
  }, [page]);
  useEffect(() => {
    const cond = data.find((item: any) => item.id === data_.data[0].id);
    if (!cond) {
      setData([...data, ...data_.data]);
    }
  }, [data_]);
  useEffect(() => {
    router.replace(window.location.pathname);
    setData([]);
    setLoading(false);
  }, []);
  const containerRef: any = useRef(null);
  let isDragging = false;
  let startX: any;
  let scrollLeft: any;
  const handleMouseDown = (e: any) => {
    containerRef.current.classList.remove("cursor-normal");
    containerRef.current.classList.add("cursor-grabbing");
    isDragging = true;
    startX = e.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
  };
  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUpOrLeave = () => {
    containerRef.current.classList.add("cursor-normal");
    containerRef.current.classList.remove("cursor-grabbing");
    isDragging = false;
  };
  const countData = forP ? data.slice(0, 10) : data;
  return (
    <>
      <div
        className={`relative rounded-lg overflow-hidden select-none w-full border border-seclight bg-maindark my-4`}
      >
        <h3 className="sticky bg-maindark z-[48] left-0 top-0 w-full p-4 flex justify-between items-center mb-4 text-xl font-semibold text-mainlight">
          <span>Latest {role !== "worker" ? "orders" : "services"}</span>
          <Link
            href={role !== "worker" ? "orders" : "services"}
            className="px-4 py-2 text-base text-maindark bg-mainlight font-semibold rounded-md shadow-md w-fit"
          >
            All {role !== "worker" ? "orders" : "services"}
          </Link>
        </h3>
        <h1
          className={`${
            data.length === 0 && !loading ? "" : "hidden"
          } w-fit bg-seclightblur mx-auto py-3 px-5 rounded-md font-semibold mb-5`}
        >
          You have no {role === "client" ? "orders" : "services"}
        </h1>
        <h1
          className={`${
            !loading ? "hidden" : ""
          } w-fit bg-seclightblur mx-auto py-3 px-5 rounded-md font-semibold`}
        >
          Loading...
        </h1>
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={styles.orders + " flex flex-col px-4 w-full sm:overflow-x-scroll"}
        >
          {data?.length !== 0 &&
            countData?.map((e: any) => (
              <div
                key={e.id}
                className="relative sm:min-w-fit mt-3 sm:gap-6 flex flex-wrap sm:flex-nowrap gap-y-4 border-b border-seclight pb-4 md:pb-5"
              >
                <div className="absolute right-[5px] sm:right-0 sm:bottom-[5px] bottom-[60px] text-xs">
                  {handleCreatedDate(e.created_at)}
                </div>
                {role === "client" ? (
                  <ClientOrders
                    orderId={e.id}
                    clientPaid={e.client_paid}
                    businessId={e.business.id}
                    title={e.business.title}
                    name={e.business.worker.first_name + " " + e.business.worker.last_name}
                    email={e.business.worker.email}
                    gender={e.business.worker.gender}
                    day={e.day}
                    from={e.from}
                    to={e.to}
                    price={
                      handleHours(
                        e.from.match(/\d+/g)[0],
                        e.from.match(/[a-zA-Z]/g)?.join(""),
                        e.to.match(/\d+/g)[0],
                        e.to.match(/[a-zA-Z]/g)?.join("")
                      ) * +e.business.price
                    }
                    guideOpinin={e.worker_accept}
                    status={
                      e.worker_accept === "cancelled" || e.client_cancel ? "cancelled" : "pending"
                    }
                  />
                ) : (
                  <WorkerService
                    orderId={e.id}
                    businessId={e.business.id}
                    title={e.business.title}
                    name={e.client.first_name + " " + e.client.last_name}
                    email={e.client.email}
                    gender={e.client.gender}
                    day={e.day}
                    from={e.from}
                    to={e.to}
                    workerAccept={e.worker_accept}
                    price={
                      handleHours(
                        e.from.match(/\d+/g)[0],
                        e.from.match(/[a-zA-Z]/g)?.join(""),
                        e.to.match(/\d+/g)[0],
                        e.to.match(/[a-zA-Z]/g)?.join("")
                      ) * +e.business.price
                    }
                    clientPaid={e.client_paid}
                    companyPaid={e.company_paid}
                    status={
                      e.worker_accept === "cancelled" || e.client_cancel ? "cancelled" : "pending"
                    }
                  />
                )}
              </div>
            ))}
        </div>
        <button
          onClick={() => setPage(page + 1)}
          className={`${
            (forP || data_.total === data.length) && "hidden"
          } ml-[50%] translate-x-[-50%] w-fit py-2 underline hover:no-underline`}
        >
          Load more
        </button>
      </div>
    </>
  );
}
{
}
