import type { DebugProblemBrief } from "./types";

export const ProblemsList = ({ data }: { data: DebugProblemBrief[] }) => {
  return (
    <div className="w-full divide-y-2 divide-gray-200">
      <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-md">
        <thead>
          <tr className=" bg-gray-300 text-sm font-semibold md:text-lg">
            <th> Problem </th>
            <th> Score </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};
