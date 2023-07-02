"use client";
import { useAppSelector } from "@redux/hooks";
import { clsx } from "@utils/shared";
import Link from "next/link";

export const CreateProblem = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    user?.status === "Admin" && (
      <Link
        href="/problems/create"
        className={clsx(
          "mb-4 flex h-12 items-center justify-center rounded-md border-2 transition-all",
          "border-gray-300 bg-[length:200%_200%] bg-[0%_0%] px-6 font-bold text-black duration-500 hover:bg-[100%_200%] hover:text-white",
          "bg-gradient-to-r from-slate-100 via-green-300 to-green-900",
          "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        )}
      >
        Create problem
      </Link>
    )
  );
};
