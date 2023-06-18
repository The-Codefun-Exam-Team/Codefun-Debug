import type { RankingsData } from "./types";

export const RankTable = ({ rankingData, page }: { rankingData: RankingsData; page: number }) => {
  return (
    <div className="w-full">
      <table className="mt-8 w-full table-auto">
        <thead className="h-fit">
          <tr className="h-12 bg-gray-300 text-lg">
            <th className="font-semibold">#</th>
            <th className="font-semibold">Username</th>
            <th className="font-semibold">Name</th>
            <th className="font-semibold">Points</th>
            <th className="font-semibold">Rank</th>
          </tr>
        </thead>
        <tbody className="h-fit divide-y-2 divide-gray-200">
          {rankingData.map((user, index) => {
            return (
              <tr key={`ranking-page-${page}-user-${user.id}`} className="h-10 even:bg-gray-100 ">
                <td className="text-center">{(page - 1) * 50 + index + 1}</td>
                <td className="text-center">{user.username}</td>
                <td className="text-center">{user.name}</td>
                <td className="text-center">{Math.round(user.points * 100) / 100}</td>
                <td className="text-center">{user.rank}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
