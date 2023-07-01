"use client";
import { useAppSelector } from "@redux/hooks";
import Link from "next/link";

export const CreateProblem = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  return user?.status == "Admin" && <Link href="/problems/create">Create problem</Link>;
};
