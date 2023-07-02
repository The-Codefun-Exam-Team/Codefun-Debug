"use client";
import { useAppSelector } from "@redux/hooks";
import Link from "next/link";

export const CreateProblem = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    user?.status === "Admin" && (
      <Link
        href="/problems/create"
        className="mb-4 block h-fit rounded-md border-2 border-green-500 bg-green-200 p-2 text-center text-xl font-bold text-green-500"
      >
        Create problem
      </Link>
    )
  );
};
