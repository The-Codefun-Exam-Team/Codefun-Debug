import prisma from "@database/prisma/instance";
import { Prisma } from "@prisma/client";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

import { Pagination } from "@/components";
import { Groups, RankTable } from "@/features/rankings";

export const metadata: Metadata = {
  title: "Rankings",
};

export const generateStaticParams = async () => {
  const query = await prisma.debugUserGroup.groupBy({
    by: ["group_id"],
    _count: {
      user_id: true,
    },
  });

  let globalCount = 0;
  const groupCounts = query.map(({ group_id: groupId, _count: { user_id: count } }) => {
    globalCount = globalCount + count;
    return { count, groupId };
  });

  groupCounts.push({ count: globalCount, groupId: 0 });

  const params = groupCounts.flatMap(({ count, groupId }) => {
    const page = Math.ceil((Number(count) + 1) / 50);
    return Array.from({ length: page }, (_, i) => ({
      group: groupId.toString(),
      page: (i + 1).toString(),
    }));
  });
  return params;
};

export const revalidate = 30;

const getUserCount = async (groupId: number) => {
  try {
    return unstable_cache(
      async () => {
        return await prisma.debugUserGroup.count({
          where: {
            group_id: groupId ? groupId : undefined,
          },
        });
      },
      [`getUserCount-${groupId}`],
      { revalidate: 60 },
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
