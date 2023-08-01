"use client";
import { setLoading, setUser } from "@redux/slice";
import { store } from "@redux/store";
import type { UserData } from "@schemas/loginSchema";
import { useEffect } from "react";

let didFetchUser = false;

export const ClientLogic = () => {
  useEffect(() => {
    if (!didFetchUser) {
      didFetchUser = true;
      // We only want to run this on client.
      store.dispatch(async (dispatch) => {
        const res = await fetch("/api/next/auth/authenticate", {
          method: "GET",
        });
        if (!res.ok) {
          // TODO: handle fetch error
          return;
        }
        const user = (await res.json()) as UserData;
        dispatch(
          setUser({
            user,
          }),
        );
        dispatch(setLoading(false));
      });
    }
  }, []);
  return <></>;
};
