export default function PostSkeleton() {
  const all = [];
  for (let i = 0; i < 20; i++) {
    all.push(
      <div
        key={i}
        className={
          "bg-gradient-to-tr from-[#AE9460] to-[#cdbc9a] w-full md:w-[calc(33.33%-.332rem)] lg:w-[calc(25%-.375rem)] max-h-[454px] relative flex flex-col overflow-hidden rounded-[17px] border border-gray-100 bg-maindark shadow-md min-[500px]:w-[calc(50%-0.5rem/2)]"
        }
      >
        <div className="bg-seclightblur mx-3 mt-3 h-[170px] flex items-center justify-center rounded-xl">
          <svg
            className="w-10 h-10 text-mainlight"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="mt-4 px-5 pb-5">
          <div className="h-2 bg-seclightblur rounded-full max-w-[75%] mb-2.5"></div>
          <div className="h-2 bg-seclightblur rounded-full max-w-[55%]"></div>
          <div className={"mt-2 mb-5"}>
            <div className="h-[30px] bg-seclightblur rounded-full max-w-[40px]"></div>
            <div className="h-[20px] bg-seclightblur rounded-full max-w-[120px] mt-3"></div>
          </div>
          <div className="h-[35px] bg-seclightblur rounded-md max-w-full mt-3"></div>
        </div>
      </div>
    );
  }
  return <>{all}</>;
}
