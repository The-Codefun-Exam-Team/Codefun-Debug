"use client";
import { useAppSelector } from "@redux/hooks";

// TODO: restyle
export const UserInfo = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <></>;
  }
  return <p>{user.username}</p>;
};
