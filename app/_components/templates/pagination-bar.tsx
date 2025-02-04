"use client";
import { useRouter } from "next/navigation";
import { Pagination } from "@mui/material";

export default function MyPagination({
  pageNum,
  totalPages,
}: {
  pageNum: number | string;
  totalPages: number;
}) {
  const router = useRouter();
  const handleGoTo = (_: any, value: any) => {
    router.push(`?page=${value}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Pagination
      className="w-fit font-bold bg-seclight rounded-lg mx-auto mt-4"
      page={pageNum ? Number(pageNum) : 1}
      onChange={handleGoTo}
      count={totalPages}
      shape="rounded"
      sx={{
        "& .MuiPaginationItem-root": { color: "#ae9460" },
        "& .Mui-selected": { color: "#dfd6c5", backgroundColor: "#ae9460" },
      }}
    />
  );
}
