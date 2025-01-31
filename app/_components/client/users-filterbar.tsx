"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<any>(`?`);
  const [age, setAge] = useState("18");
  const [ageUi, setAgeUi] = useState("18");
  const [ageTimer, setAgeTimer] = useState<any>();
  const removeFromFilters = (filter: string) => {
    const isHere = selectedOptions.indexOf(filter);
    if (isHere === -1) return selectedOptions;
    const filtersArray = selectedOptions.slice(1).split("&");
    const finalArray = filtersArray.filter((e: string) => e.split("=")[0] !== filter);
    return "?" + finalArray.join("&");
  };
  const handleOption = (query: string) => {
    const filter = query.split(`=`)[0];
    const selectedOptions_ = removeFromFilters(filter);
    if (selectedOptions.indexOf(query) !== -1) {
      setSelectedOptions(selectedOptions_);
      return;
    }
    setSelectedOptions(selectedOptions_ + query + "&");
  };
  const handleAge = (value: string) => {
    if (ageTimer) {
      clearTimeout(ageTimer);
    }
    const timer = setTimeout(() => {
      setAge(value);
    }, 1500);
    setAgeTimer(timer);
  };
  useEffect(() => {
    const selectedOptions_ = removeFromFilters("minAge");
    if (+age > 18) {
      setSelectedOptions(selectedOptions_ + `minAge=${age}&`);
      return;
    }
    setSelectedOptions(selectedOptions_);
  }, [age]);
  useEffect(() => {
    router.push(window.location.pathname + selectedOptions + "page=1");
  }, [selectedOptions]);

  return (
    <div className="relative w-full border-b-2 border-maindark flex flex-col gap-3 justify-center items-center px-2 pb-5 pt-10 md:flex-row md:justify-between">
      <h1 className="absolute left-[10px] top-0 font-bold text-maindark text-lg md:text-xl">
        Filter Options :
      </h1>
      <div className="flex items-center gap-2">
        <div className="font-semibold text-sm lg:text-base text-maindark md:hidden">Type: </div>
        <div
          onClick={() => handleOption(`type=clients`)}
          className={`border-2 border-maindark hover:bg-maindark text-sm md:text-base hover:text-mainlight px-2 py-1 px-3 py-1 md:px-4 md:py-2 rounded-full text-nowrap cursor-pointer h-fit duration-300 ${
            searchParams.toString().indexOf("type=clients") !== -1 ||
            searchParams.toString().indexOf("type") === -1
              ? `bg-maindark text-mainlight`
              : `text-maindark`
          }`}
        >
          Clients
        </div>
        <div
          onClick={() => handleOption(`type=workers`)}
          className={`border-2 border-maindark hover:bg-maindark text-sm md:text-base hover:text-mainlight px-2 py-1 px-3 py-1 md:px-4 md:py-2 rounded-full text-nowrap cursor-pointer h-fit duration-300 ${
            searchParams.toString().indexOf("type=workers") !== -1
              ? `bg-maindark text-mainlight`
              : `text-maindark`
          }`}
        >
          Workers
        </div>
        <div
          onClick={() => handleOption(`type=admins`)}
          className={`border-2 border-maindark hover:bg-maindark text-sm md:text-base hover:text-mainlight px-2 py-1 px-3 py-1 md:px-4 md:py-2 rounded-full text-nowrap cursor-pointer h-fit duration-300 ${
            searchParams.toString().indexOf("type=admins") !== -1
              ? `bg-maindark text-mainlight`
              : `text-maindark`
          }`}
        >
          Admins
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="font-semibold text-sm lg:text-base text-maindark md:hidden">Gender: </div>
        <div
          onClick={() => handleOption(`gender=male`)}
          className={`border-2 border-maindark hover:bg-maindark text-sm md:text-base hover:text-mainlight px-2 py-1 px-3 py-1 md:px-4 md:py-2 rounded-full text-nowrap cursor-pointer h-fit duration-300 ${
            searchParams.toString().indexOf("gender=male") !== -1
              ? `bg-maindark text-mainlight`
              : `text-maindark`
          }`}
        >
          Male
        </div>
        <div
          onClick={() => handleOption(`gender=female`)}
          className={`border-2 border-maindark hover:bg-maindark text-sm md:text-base hover:text-mainlight px-2 py-1 px-3 py-1 md:px-4 md:py-2 rounded-full text-nowrap cursor-pointer h-fit duration-300 ${
            searchParams.toString().indexOf("gender=female") !== -1
              ? `bg-maindark text-mainlight`
              : `text-maindark`
          }`}
        >
          Female
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="font-semibold text-sm md:text-base text-maindark text-nowrap">
          Min Age: {ageUi}
        </div>
        <input
          onChange={(e) => {
            const value = e.target.value;
            handleAge(value);
            setAgeUi(value);
          }}
          value={ageUi}
          min={18}
          max={90}
          type="range"
          className="w-full h-2 bg-maindark rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}
