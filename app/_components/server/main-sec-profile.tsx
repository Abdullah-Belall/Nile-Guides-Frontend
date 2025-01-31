import Image from "next/image";
import Link from "next/link";
import maleAvatar from "@/public/maleAvatar.png";
import femaleAvatar from "@/public/femaleAvatar.png";
import styles from "@/app/ui/main-sec-profile.module.css";
import { FaRegEdit } from "react-icons/fa";
import { unCountedMessage } from "@/app/_utils/interfaces/main";

export default async function MainSecProfile({
  ProfileResponse,
}: {
  ProfileResponse: { done: boolean; message: string; data?: any };
}) {
  const data = ProfileResponse?.data;
  if (ProfileResponse?.done) {
    const imgCondition: any =
      data?.avatar && data?.avatar !== "" && data?.avatar !== "null"
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${data?.avatar}`
        : data?.gender === "male"
        ? maleAvatar
        : femaleAvatar;
    return (
      <div className="py-2 md:py-6 w-full">
        <div className="w-full">
          <div className="space-y-4 w-full">
            <div className="flex flex-col items-center md:items-stretch md:flex-row gap-8 w-full">
              <div className="w-[60%] lg:w-[40%] h-fit aspect-square relative border border-maindark rounded-md">
                <Image
                  objectFit="cover"
                  className="rounded-lg aspect-square"
                  fill
                  src={imgCondition}
                  alt="Helene avatar"
                />
              </div>
              <div className="flex flex-wrap min-h-full gap-2 mt-4 w-[90%]">
                <dl className="w-[calc(50%-.5rem)]">
                  <dt className="font-semibold text-maindark text-base">User name</dt>
                  <dd className="text-maindarkblur text-base sm:text-xl">
                    {data?.first_name} {data?.last_name}
                  </dd>
                </dl>
                <dl className={styles.scrollBar + " w-[calc(50%-.5rem)] overflow-x-scroll"}>
                  <dt className="font-semibold text-maindark text-base">Email Address</dt>
                  <dd className="text-maindarkblur text-sm text-wrap">{data?.email}</dd>
                </dl>
                <dl className="w-[calc(50%-.5rem)]">
                  <dt className="font-semibold text-maindark text-base">Age</dt>
                  <dd className="flex items-center gap-1 text-maindarkblur text-base sm:text-xl">
                    {data?.age} years old
                  </dd>
                </dl>
                {data?.state && (
                  <dl className="w-[calc(50%-.5rem)]">
                    <dt className="font-semibold text-maindark text-base">Government</dt>
                    <dd className="flex items-center gap-1 text-maindarkblur text-base sm:text-xl">
                      {data?.state} government
                    </dd>
                  </dl>
                )}
                <dl className="w-[calc(50%-.5rem)]">
                  <dt className="font-semibold text-maindark text-base">Gender</dt>
                  <dd className="flex items-center gap-1 text-maindarkblur text-base sm:text-xl">
                    {data?.gender}
                  </dd>
                </dl>
                <dl className="w-[calc(50%-.5rem)]">
                  <dt className="font-semibold text-maindark text-base">Role</dt>
                  <dd className="flex items-center gap-1 text-maindarkblur text-base sm:text-xl">
                    {data?.role}
                  </dd>
                  {data?.role === "client" && (
                    <span className="text-maindark text-xs sm:text-sm">
                      Want to be worker{" "}
                      <Link
                        href={"/make-ticket/change-role"}
                        className="text-mainlight underline hover:no-underline duration-200"
                      >
                        click here
                      </Link>
                    </span>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ms-2 mt-3">
          <Link
            href={`/profile/${data?.avatar}cuthere${data?.first_name}cuthere${data?.last_name}cuthere${data?.age}cuthere${data?.gender}cuthere${data?.role}cuthere${data?.state}`}
            className="inline-flex w-fit gap-1.5 items-center justify-center rounded-lg text-maindarkblur hover:text-mainlight duration-200"
          >
            <FaRegEdit />
            Edit your data
          </Link>
        </div>
      </div>
    );
  } else {
    return <h1 className="text-maindark mx-auto">{unCountedMessage}</h1>;
  }
}
