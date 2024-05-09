import { Heading } from "@/components";
import { getUsers } from "@/features/rankings";

export const BriefRankTable = async () => {
  const data = await getUsers(0, 1, 10);
  return (
    <div className="w-full [&>:where(h1,h2)]:!text-accent-light dark:[&>:where(h1,h2)]:!text-accent-dark">
      <Heading type="title-large">Top ranking</Heading>
      {data.length === 0 ? (
        <Heading type="title">There&apos;s nothing here.</Heading>
      ) : (
        <table className="mt-4 w-full table-auto bg-white px-2 dark:bg-slate-900">
          <thead>
            <tr className="border-b-2 border-slate-200 text-slate-800 dark:border-b-[0.5px] dark:border-slate-700 dark:text-slate-100 [&>th]:p-[14px] [&>th]:text-xl [&>th]:font-bold">
              <th className="text-left">#</th>
              <th className="text-left">User</th>
              <th className="text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-200 font-semibold text-gray-600 dark:divide-y-[0.5px] dark:divide-slate-800 dark:text-slate-300">
            {data.map((user) => (
              <tr key={`ranking-user-${user.username}`} className="[&>td]:p-[14px]">
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
