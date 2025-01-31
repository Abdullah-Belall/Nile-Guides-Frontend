import { HiDotsHorizontal } from "react-icons/hi";

export default function MyButton({
  say,
  buttonColors,
  vaildationMessage,
  vaildationMessageWidth,
  clickFunc,
  loading,
}: {
  buttonColors: string;
  say: string;
  loading?: boolean;
  vaildationMessage?: string;
  vaildationMessageWidth?: string;
  clickFunc: any;
}) {
  return (
    <>
      <p className={`${vaildationMessageWidth ?? "w-full"} text-xs text-rose-600 mt-2`}>
        {vaildationMessage}
      </p>
      <button
        onClick={(e) => clickFunc(e)}
        className={`${
          loading ? "animate-pulse" : ""
        } w-[120px] py-2.5 rounded-md ${buttonColors} mt-2 flex justify-center items-center text-nowrap`}
      >
        {loading ? <HiDotsHorizontal className="text-3xl" /> : say}
      </button>
    </>
  );
}
