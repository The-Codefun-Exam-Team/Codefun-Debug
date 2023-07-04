import { Heading } from "@/components";
import type { UserRanking } from "@/shared/types";

export const Rankings = async ({ data }: { data: UserRanking[] }) => (
  <div className="w-full overflow-x-auto rounded-md border-2 border-gray-300 bg-gray-300">
    <div className="w-full border-b-[1px] p-3">
      <Heading type="title-large">Top users</Heading>
    </div>
    <table className="w-full table-auto border-spacing-y-4 bg-white px-2">
      <thead>
        <tr className="[&>th]:border-b-2 [&>th]:p-2">
          <th className="text-right">#</th>
          <th className="text-center">User</th>
          <th className="text-right">Score</th>
        </tr>
      </thead>
      <tbody className="divide-y-2 divide-slate-200">
        {data.map((user) => (
          <tr key={`ranking-user-${user.id}`} className="[&>td]:p-2">
            <td className="text-right">{user.rank}</td>
            <td className="text-center">{user.name}</td>
            <td className="text-right">{Math.round(user.points * 100) / 100}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
