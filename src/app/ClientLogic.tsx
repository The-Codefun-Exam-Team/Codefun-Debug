"use client";
import { useAppDispatch } from "@redux/hooks";
import { setUser } from "@redux/slice";
import { useEffect } from "react";

let didCheckInitialAuthentication = false;

export const ClientLogic = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getUser = async () => {
      if (!didCheckInitialAuthentication) {
        didCheckInitialAuthentication = true;
        try {
          const res = await fetch("/beta/api/auth/authenticate", {
            method: "GET",
          });
          if (!res.ok) {
            // TODO: handle fetch error
            return;
          }
          const user = (await res.json()) as any;
          dispatch(setUser(user));
        } catch (err) {
          // TODO: handle exception
        }
      }
    };
    getUser();
  }, [dispatch]);
  return <></>;
};
