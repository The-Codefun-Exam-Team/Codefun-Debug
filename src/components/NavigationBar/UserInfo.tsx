"use client";
import { useAppSelector } from "@redux/hooks";
import Link from "next/link";

export const UserInfo = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Link href="/login">Login</Link>;
  }
  return <p>{user.username}</p>;
};
