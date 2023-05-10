"use client";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setUser } from "@redux/slice";
import Link from "next/link";

export const Loginout = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const logout = async () => {
    fetch("beta/api/auth/logout", {
      method: "POST",
    });
    dispatch(setUser(null));
  };
  if (loading) {
    return <></>;
  }
  if (!user) {
    return <Link href="/login">Login</Link>;
  }
  
  return <p onClick={logout}>Logout</p>;
  
};
