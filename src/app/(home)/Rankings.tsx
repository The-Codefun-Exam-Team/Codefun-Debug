import { Heading } from "@/components";
import type { UserRanking } from "@/shared/types";

export const Rankings = async ({ data }: { data: UserRanking[] }) => (
  <div className="w-full">
    <div className="w-full">
      <Heading type="display">
        <div className="text-accent-light dark:text-accent-dark">Top ranking</div>
      </Heading>
    </div>
    <table className="mt-4 w-full  table-auto bg-white px-2 dark:bg-slate-900">
      <thead>
        <tr className="border-b-2 border-slate-200 text-slate-800 dark:border-b-[0.5px] dark:border-slate-700 dark:text-slate-100 [&>th]:p-[14px] [&>th]:text-xl [&>th]:font-bold">
          <th className="text-left">#</th>
          <th className="text-left">User</th>
          <th className="text-right">Score</th>
        </tr>
      </thead>
      <tbody className="divide-y-2 divide-gray-200 font-semibold text-gray-600 dark:divide-y-[0.5px] dark:divide-slate-800 dark:text-slate-300">
        {data.length === 0 ? (
          <tr>
            <td className="pt-4">
              <Heading type="title-large">There&apos;s nothing here.</Heading>
            </td>
          </tr>
        ) : (
          data.map((user) => (
            <tr key={`ranking-user-${user.id}`} className="[&>td]:p-[14px]">
              <td className="text-left">{user.rank}</td>
              <td className="text-left">{user.name}</td>
              <td className="text-right">{user.score.toFixed(2)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
