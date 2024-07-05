import { H2, H3 } from "@/components";
import { getUsers } from "@/features/rankings";

export const BriefRankTable = async () => {
  const query = await getUsers(0, 1, 10);
  if (!query.ok) {
    throw new Error(query.message);
  }
  const data = query.data;
  return (
    <div className="w-full [&>:where(h1,h2)]:!text-accent-light dark:[&>:where(h1,h2)]:!text-accent-dark">
      <H2>Top ranking</H2>
      {data.length === 0 ? (
        <H3>There&apos;s nothing here.</H3>
      ) : (
        <table className="w-full table-auto bg-white px-2 dark:bg-slate-900">
          <thead>
            <tr className="border-b-2 border-slate-200 text-slate-800 dark:border-b-[0.5px] dark:border-slate-700 dark:text-slate-100 [&>th]:p-[14px] [&>th]:text-xl [&>th]:font-bold">
              <th className="text-left">#</th>
              <th className="text-left">User</th>
              <th className="text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-200 font-semibold text-gray-600 dark:divide-y-[0.5px] dark:divide-slate-800 dark:text-slate-300">
            {data.map((user) => (
              <tr
                key={`ranking-user-${user.username}`}
                className="[&>td]:my-3 [&>td]:p-3"
              >
                <td className="text-left">{user.rank}</td>
                <td className="text-left">{user.displayName}</td>
                <td className="text-right">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const BriefRankTableSkeleton = async () => {
  return (
    <div className="w-full">
      <H3>Top ranking</H3>
      <table className="mt-4 w-full table-auto bg-white px-2 dark:bg-slate-900">
        <thead>
          <tr className="border-b-2 border-slate-200 text-slate-800 dark:border-b-[0.5px] dark:border-slate-700 dark:text-slate-100 [&>th]:p-[14px] [&>th]:text-xl [&>th]:font-bold">
            <th className="text-left">#</th>
            <th className="text-left">User</th>
            <th className="text-right">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-gray-200 font-semibold text-gray-600 dark:divide-y-[0.5px] dark:divide-slate-800 dark:text-slate-300">
          {Array.from({ length: 10 }, (_, i) => (
            <tr key={`ranking-user-${i}`}>
              <td className="text-left text-transparent">
                <div className="flex justify-start">
                  <div className="my-3 h-5 w-10 animate-pulse self-end rounded-md bg-gray-200 py-3 dark:bg-slate-600"></div>
                </div>
              </td>
              <td className="text-left text-transparent">
                <div className="flex justify-start">
                  <div className="my-3 h-5 w-80 animate-pulse self-end rounded-md bg-gray-200 py-3 dark:bg-slate-600"></div>
                </div>
              </td>
              <td className="text-right text-transparent">
                <div className="flex justify-end">
                  <div className="my-3 h-5 w-20 animate-pulse self-end rounded-md bg-gray-200 py-3 dark:bg-slate-600"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
