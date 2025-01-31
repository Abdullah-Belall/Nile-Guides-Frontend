export default function PostPageSkeleton() {
  return (
    <div
      role="status"
      className="w-full space-y-8 animate-pulse md:space-y-0 md:flex md:items-center px-mainX"
    >
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:gap-3">
          <div className="flex flex-col md:w-full">
            <div
              className={
                "w-[calc(100%-.25rem*2)] h-[300px] relative rounded-xl mx-1 pt-3 overflow-hidden"
              }
            >
              <div className="flex items-center justify-center w-full h-full bg-seclightblur rounded">
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
            </div>
            <div className="flex gap-2 items-center px-3 mt-1 mb-2">
              <div className="h-2.5 bg-seclightblur rounded-full w-24"></div>
              <div className="h-2.5 bg-seclightblur rounded-full w-24"></div>
              <div className="h-2.5 bg-seclightblur rounded-full w-24"></div>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-3 mt-2 md:w-full md:mt-5">
            <div className="flex flex-col gap-3 md:gap-6 md:w-full">
              <div className="h-5 rounded-full bg-seclightblur w-[180px] mb-4"></div>
              <div className="h-3 rounded-full bg-seclightblur w-[290px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-seclightblur w-[290px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-seclightblur w-[290px]"></div>
            </div>
            <span className="w-full h-[1px] bg-secdark my-4 md:mb-4 md:mt-9 md:w-full"></span>
            <div className="flex p-2 border-[1px] border-secdark rounded-2xl md:mt-9 md:w-full md:justify-self-end md:mt-[-10px]">
              <svg
                className="w-[100px] h-[100px] me-3 text-seclightblur"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div className="mt-3 ml-3">
                <div className="h-2.5 rounded-full bg-seclightblur w-32 mb-2"></div>
                <div className="w-48 h-2 rounded-full bg-seclightblur"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
