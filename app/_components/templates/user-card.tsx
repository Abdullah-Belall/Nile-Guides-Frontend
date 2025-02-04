import Image from "next/image";
import maleAvatar from "@/public/maleAvatar.png";
import femaleAvatar from "@/public/femaleAvatar.png";
import Link from "next/link";
import { BaseImagesLink } from "@/app/base";
export default function UserCard({ avatar, name, role, email, gender, age }: any) {
  return (
    <div className="w-full bg-seclight shadow-md rounded-lg py-3">
      <div className="photo-wrapper p-2">
        <Image
          className="rounded-full mx-auto border border-maindark"
          width={128}
          height={128}
          src={
            avatar
              ? `${BaseImagesLink}/uploads/${avatar}`
              : gender === "male"
              ? maleAvatar
              : femaleAvatar
          }
          alt={name}
        />
      </div>
      <div className="py-2 pl-2 w-[calc(100%-8px)] overflow-hidden mr-2">
        <h3 className="text-center text-xl text-maindark font-bold leading-8">{name}</h3>
        <div className="text-center text-maindarkblur text-sm">
          <p>{role}</p>
        </div>
        <table className="text-xs my-3">
          <tbody>
            <tr>
              <td className="px-2 py-2 text-maindarkblur font-semibold text-nowrap">
                Email address
              </td>
              <td className="px-2 py-2">{email}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 text-maindarkblur font-semibold">Gender</td>
              <td className="px-2 py-2">{gender}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 text-maindarkblur font-semibold">age</td>
              <td className="px-2 py-2">{age} years old</td>
            </tr>
          </tbody>
        </table>
        <Link
          className={`py-2 w-full block text-center text-seclight bg-mainlight rounded-lg`}
          href={`/dashboard/users/${email}`}
        >
          More details
        </Link>
      </div>
    </div>
  );
}
