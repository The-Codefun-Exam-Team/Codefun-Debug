import type { UserRanking } from "@/shared/types";

export const Rankings = async ({ data }: { data: Array<UserRanking> }) => {
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
