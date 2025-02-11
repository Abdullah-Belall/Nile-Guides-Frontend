import Link from "next/link";
import StarsGenrator from "./stars-genrator";
import Image from "next/image";
import { BaseImagesLink } from "@/app/base";

export default function PostCard({
  id,
  title,
  img,
  price,
  rate,
}: {
  id: string;
  title: string;
  img: string;
  price: string;
  rate: string;
}) {
  return (
    <div className="border border-seclight bg-gradient-to-tr from-[#AE9460] to-[#cdbc9a] w-full max-h-[454px] relative flex flex-col overflow-hidden rounded-[17px] shadow-sm">
      <Link
        className="relative mx-3 mt-3 flex h-[170px] overflow-hidden rounded-xl"
        href={"/posts/" + id}
      >
        <Image
          loading="eager"
          className="object-cover"
          fill
          objectFit="cover"
          src={`${BaseImagesLink}/uploads/${img}`}
          alt={title}
        />
      </Link>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl tracking-tight text-mainlight truncate">{title}</h5>
        <div className={"mt-2 mb-5 flex items-center justify-between flex-col gap-2"}>
          <p>
            <span className="text-3xl font-bold text-mainlight mr-1">${price}</span>
            <span className="text-xs text-mainlight text-nowrap">for hour</span>
          </p>
          <div className="flex items-center">
            <StarsGenrator rate={+rate} />
          </div>
        </div>
        <Link
          href={`/posts/${id}/order?title=${title}&image=${img}&price=${price}`}
          className="flex font-semibold items-center justify-center rounded-md duration-300 px-5 py-2.5 text-center text-sm font-medium text-mainlight hover:bg-mainlight hover:text-maindark border border-mainlight focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Book now
        </Link>
      </div>
    </div>
  );
}
