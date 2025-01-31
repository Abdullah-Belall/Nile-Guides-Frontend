import {
  PROFILE_SERVER_REQ,
  SERVER_COLLECTOR_REQ,
} from "@/app/_utils/requests/server-requests-hub";
import Image from "next/image";
import Link from "next/link";
import maleAvatar from "@/public/maleAvatar.png";
import femaleAvatar from "@/public/femaleAvatar.png";

export default async function DynamicNavBarPart() {
  const response = await SERVER_COLLECTOR_REQ(PROFILE_SERVER_REQ);
  if (response?.done) {
    const imgCondition: any =
      response?.data?.avatar && response?.data?.avatar !== "" && response?.data?.avatar !== "null"
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${response?.data?.avatar}`
        : response?.data?.gender === "male"
        ? maleAvatar
        : femaleAvatar;
    return (
      <div className={`flex items-center gap-2 sm:gap-4`}>
        <Image
          loading={"eager"}
          width={40}
          height={40}
          objectFit="cover"
          className="rounded-full border border-maindark"
          src={imgCondition}
          alt=""
        />
        <div className="font-medium">
          <div className={`text-sm sm:text-base text-secdark duration-300 cursor-pointer`}>
            {response?.data?.gender === "female" ? "Mrs/" : "Mr/"}
            {response?.data?.first_name}
          </div>
          <div className="text-xs sm:text-sm text-secdark text-start">{response?.data?.role}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`flex gap-4 sm:gap-9 items-center`}>
        <Link
          href={"/sign-up"}
          className={
            "hover:text-[#ae9460a6] text-sm font-semibold duration-300 sm:text-base text-maindark"
          }
        >
          Sign up
        </Link>
        <Link
          href={"/log-in"}
          className={
            "hover:bg-[#ae9460aa] text-sm font-semibold duration-300 sm:text-base text-mainlight bg-maindark px-4 py-2 sm:px-5 sm:py-2 rounded-full"
          }
        >
          Log in
        </Link>
      </div>
    );
  }
}
