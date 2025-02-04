import Image from "next/image";
import BookNow from "../client/book-now";
import StarsGenrator from "./stars-genrator";
import Description from "../client/description";
import { BaseImagesLink } from "@/app/base";
import {
  GET_RATE_SERVER_REQ,
  SERVER_COLLECTOR_REQ,
} from "@/app/_utils/requests/server-requests-hub";
import RateSection from "../server/rate-section";

export default async function PostPage({ data, page, mostRated }: any) {
  const {
    id,
    title,
    description,
    language,
    language_level,
    state,
    price,
    image,
    rate,
    raters_counter,
    worker: { first_name, last_name, avatar, gender, email, age },
  } = data;
  const getRateResponse = await SERVER_COLLECTOR_REQ(GET_RATE_SERVER_REQ, { id });
  return (
    <div className="w-full px-mainX mb-6">
      <div className="flex flex-col md:flex-row md:gap-3 w-full">
        <div className="flex flex-col w-full">
          <div className={"w-full h-[300px] relative rounded-xl pt-3 overflow-hidden"}>
            <Image
              src={`${BaseImagesLink}/uploads/${image}`}
              alt={title}
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </div>
          <div className="flex gap-2 items-center px-3 mt-1">
            <div className="text-xs md:text-sm text-main-light bg-secdark rounded-full px-2 underline hover:no-underline cursor-pointer">
              {state} Government
            </div>
            <div className="text-xs md:text-sm text-main-light bg-secdark rounded-full px-2 underline hover:no-underline cursor-pointer">
              {language}
            </div>
            <div className="text-xs md:text-sm text-main-light bg-secdark rounded-full px-2 underline hover:no-underline cursor-pointer">
              {language_level}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-3 mt-2 md:w-full">
          <div className="flex flex-col gap-3 md:gap-6">
            <div className={`text-3xl md:text-4xl font-bold max-w-[400px] text-maindark`}>
              {title}
            </div>
            <Description desc={description} />
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex gap-2">
                <StarsGenrator rate={+rate} />
              </div>
              <span className="w-1 h-1 mx-1.5 bg-secdark rounded-full"></span>
              <a className="text-sm font-medium text-secdark">{raters_counter} reviews</a>
            </div>
          </div>
          <div className="mt-2 md:mt-5">
            <BookNow title={title} image={image} postId={id} price={price} />
          </div>
          <span className="w-full h-[1px] bg-secdark my-4"></span>
        </div>
      </div>
      <div className="flex gap-3 p-2 border-[1px] border-secdark rounded-2xl md:mt-5 md:w-[50%] md:justify-self-end md:mt-[-10px]">
        <div className="w-[100px] h-[100px] border-2 border-maindark rounded-2xl relative">
          <Image
            className={`rounded-2xl`}
            fill
            src={`${BaseImagesLink}/uploads/${avatar}`}
            alt={"Worker " + first_name + " " + last_name}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-maindark text-2xl md:text-3xl font-semibold">
            {first_name} {last_name}
          </div>
          <div className="text-secdark text-sm">{email}</div>
          <div className="text-secdark text-sm">{gender}</div>
          <div className="text-secdark text-sm">{age} years old</div>
        </div>
      </div>
      <RateSection
        page={page}
        mostRated={mostRated}
        postId={id}
        rate={getRateResponse.rate ?? 0}
        text={getRateResponse.text}
      />
    </div>
  );
}
