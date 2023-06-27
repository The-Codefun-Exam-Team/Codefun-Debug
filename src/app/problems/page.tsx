import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Problems",
};

const getProblemsList = async (page: string, limit: string, language: string) => {
  const bodyData = { page, limit, language };
  const res = await fetch(
    `https://debug.codefun.vn/v3/api/problems?${new URLSearchParams(bodyData)}`,
    {
      method: "GET",
    },
  );
  if (!res.ok) {
    console.log("Error fetching problems list");
    // const error = await res.json();
    // console.log(error);
    return null;
  }
  console.log(`https://debug.codefun.vn/v3/api/problems?${new URLSearchParams(bodyData)}`);
  return await res.json();
};

const Page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return <h1>Not logged in</h1>;
  }
  const problemsList = getProblemsList("1", "10", "cpp");
  // console.log(problemsList);

  return <div>Problems page</div>;
};

export default Page;
