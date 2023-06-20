import type { RankingsData } from "./types";

export const RankTable = ({ rankingData, page }: { rankingData: RankingsData; page: string }) => {
  return (
    <div className="w-full">
      <table className="mt-8 w-full table-auto">
        <thead className="h-fit">
          <tr className="h-12 bg-gray-300 text-lg font-semibold">
            <th>#</th>
            <th>Username</th>
            <th>Name</th>
            <th>Points</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody className="h-fit divide-y-2 divide-gray-200">
          {rankingData.map((user, index) => (
            <tr
              key={`ranking-page-${page}-user-${user.id}`}
              className="h-10 text-center even:bg-gray-100"
            >
              <td>{(+page - 1) * 50 + index + 1}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{Math.round(user.points * 100) / 100}</td>
              <td>{user.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
