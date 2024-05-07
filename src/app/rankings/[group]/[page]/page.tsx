import prisma from "@database/prisma/instance";
import { Prisma } from "@prisma/client";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

import { Pagination } from "@/components";
import { Groups, RankTable } from "@/features/rankings";

export const metadata: Metadata = {
  title: "Rankings",
};

// export const generateStaticParams = async () => {
//   const groupCounts = (await prisma.$queryRaw`
//     WITH user_table AS (SELECT tid FROM debug_submissions GROUP BY tid)
//     SELECT count(user_table.tid) as count, groups.gid
//     FROM user_table
//     INNER JOIN teams ON user_table.tid = teams.tid
//     INNER JOIN groups ON teams.group = groups.gid
//     GROUP BY groups.gid
//   `) as { count: number; gid: number }[];

//   const globalCount = await prisma.debugSubmissions.findMany({
//     distinct: ["tid"],
//     select: {
//       tid: true,
//     },
//   });

//   groupCounts.push({ count: globalCount.length, gid: 0 });

//   const params = groupCounts.flatMap(({ count, gid }) => {
//     const page = Math.ceil((Number(count) + 1) / 50);
//     return Array.from({ length: page }, (_, i) => ({
//       group: gid.toString(),
//       page: (i + 1).toString(),
//     }));
//   });
//   return params;
// };

// export const revalidate = 30;

const getUserCount = async (group: number) => {
  try {
    return unstable_cache(
      async () => {
        const query = await prisma.$queryRaw<{ count: number }[]>`
          SELECt COUNT(1) FROM (SELECT DISTINCT 
            ds.user_id
          FROM 
            debug_submissions ds
            JOIN users u ON ds.user_id = u.id
          WHERE 
            CASE WHEN ${group}::integer <> 0 THEN u.group_id = ${group}::integer
            ELSE TRUE END)
        `;
        return Number(query[0].count);
      },
      [`getUserCount-${group}`],
      { revalidate: false },
    )();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    throw new Error("Internal Server Error");
  }
};

const Page = async ({
  params: { group: groupId, page },
}: {
  params: { group: string; page: string };
}) => {
  // Preload data
  const groupIdInt = parseInt(groupId);
  const pageInt = parseInt(page);
  void Promise.all([RankTable.preload(groupIdInt, pageInt), Groups.preload()]);
  const userCount = await getUserCount(groupIdInt);

  const lastPage = userCount ? Math.ceil(userCount / 50) : 1;
  return (
    <>
      <div className="relative mx-auto mb-12 flex w-full max-w-5xl flex-col p-4 md:p-10">
        <Groups groupId={groupIdInt} />
        <Pagination page={pageInt} baseURL={`/rankings/${groupId}/`} lastPage={lastPage} />
        <RankTable group={groupIdInt} page={pageInt} />
        {userCount - (pageInt - 1) * 50 > 10 && (
          <Pagination page={pageInt} baseURL={`/rankings/${groupId}/`} lastPage={lastPage} />
        )}
      </div>
    </>
  );
};

export default Page;
