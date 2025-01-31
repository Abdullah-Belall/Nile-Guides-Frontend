"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Reduirect({ reduirectTo }: { reduirectTo: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(reduirectTo);
  }, []);
  return <p></p>;
}
