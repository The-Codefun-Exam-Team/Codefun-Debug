"use client";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setUser } from "@redux/slice";

export const UserInfo = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const logout = async () => {
    fetch("/beta/api/auth/logout", {
      method: "POST",
    });
    dispatch(setUser(null));
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <></>;
  }
  return (
    <>
      <p>{user.username}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
};
