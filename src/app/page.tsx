import type { Metadata } from "next";

import type { UserRanking } from "@/shared/types";

export const metadata: Metadata = {
  title: "Home",
};

const getTopTenGlobal = async () => {
  const res = await fetch("https://debug.codefun.vn/api/rankings?pageid=1&group=0&limit=10");
  if (!res.ok) {
    console.log("Fetch ranking fail in home page");
    return null;
  }
  const data = (await res.json()) as Array<UserRanking>;
  return data;
};

const Announcements = () => {
  return (
    <>
      <div className="w-full">
        <div className="w-full border-b-2 border-slate-700">
          <h1 className="m-5 mt-2 block text-3xl">Announcements</h1>
        </div>
        <div className="p-2">Welcom to Codefun Debug</div>
      </div>
    </>
  );
};

const Rankings = async ({ data }: { data: Array<UserRanking> }) => {
  return (
    <div className="h-auto overflow-hidden rounded-md border-2 border-gray-300">
      <h2 className="border-b-[1px] bg-gray-300 p-3 text-left text-xl font-semibold text-slate-700">
        Top users
      </h2>
      <table className="w-full border-spacing-y-4 px-2">
        <thead>
          <tr className="[&>th]:border-b-2 [&>th]:p-2">
            <th className="text-right">#</th>
            <th className="text-center">User</th>
            <th className="text-right">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-slate-200">
          {data.map((user) => {
            return (
              <tr key={`ranking-user-${user.id}`} className="[&>td]:p-2">
                <td className="text-right">{user.rank}</td>
                <td className="text-center">{user.name}</td>
                <td className="text-right">{Math.round(user.points * 100) / 100}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Page = async () => {
  let rankingData = await getTopTenGlobal();
  if (rankingData === null) {
    return <h1>Fail to fetch data</h1>;
  }
  rankingData = rankingData.slice(0, 10);
  return (
    <div className="flex w-full flex-col items-start gap-5 self-stretch p-2 md:flex-row md:p-10">
      <div className="h-auto w-full md:flex-[1_1_60px]">
        <Rankings data={rankingData} />
      </div>
      <div className="flex h-full w-full md:flex-[3_3_0]">
        <Announcements />
      </div>
    </div>
  );
};

export default Page;
