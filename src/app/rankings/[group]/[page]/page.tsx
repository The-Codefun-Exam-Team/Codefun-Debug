import type { Metadata } from "next";
import { cookies } from "next/headers";

import type { UserData } from "@/shared/types";

export const metadata: Metadata = {
  title: "Rankings",
};

const Page = async ({ params: { group, page } }: { params: { group: string; page: string } }) => {
  // get token from cookie
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // fetch data
  const bodyData = { group: group, pageid: page, limit: "50" as string } as Record<string, string>;
  const request = await fetch(
    `https://debug.codefun.vn/api/rankings?${new URLSearchParams(bodyData).toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = (await request.json()) as Array<UserData>;
  console.log(data);

  return <div>Rankings page</div>;
};

export default Page;
