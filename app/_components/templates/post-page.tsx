import Image from "next/image";
import BookNow from "../client/book-now";
import StarsGenrator from "./stars-genrator";
import Description from "../client/description";

export default function PostPage({ data }: any) {
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
  return (
    <div className="w-full px-mainX">
      <div className="flex flex-col md:flex-row md:gap-3 w-full">
        <div className="flex flex-col w-full">
          <div className={"w-full h-[300px] relative rounded-xl pt-3 overflow-hidden"}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image}`}
              alt="World of Warcraft: Battle for Azeroth"
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
            <div className="flex items-center">
              <StarsGenrator rate={+rate} />
              <span className="w-1 h-1 mx-1.5 bg-secdark rounded-full"></span>
              <a className="text-sm font-medium text-secdark underline hover:no-underline cursor-pointer">
                {raters_counter} reviews
              </a>
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
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${avatar}`}
            alt="worker avatar"
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
    </div>
  );
}
