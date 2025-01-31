"use client";
import Link from "next/link";

export default function BookNow({
  price,
  postId,
  title,
  image,
}: {
  price: string;
  postId: string;
  title: string;
  image: string;
}) {
  return (
    <div className={`w-full flex justify-between`}>
      <p>
        <span className="text-3xl md:text-4xl font-bold text-maindark mr-1">${price}</span>
        <span className="text-xs text-maindark text-nowrap">for hour</span>
      </p>
      <div className="flex flex-row-reverse gap-2">
        <Link
          href={`/posts/${postId}/order?title=${title}&image=${image}&price=${price}`}
          className="gap-2 items-center hover:bg-transparent bg-yellow-400 text-mainlight text-mainlight hover:text-yellow-400 font-bold py-2 px-4 rounded-lg border-2 border-yellow-400 transition duration-200 ease-in-out"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
