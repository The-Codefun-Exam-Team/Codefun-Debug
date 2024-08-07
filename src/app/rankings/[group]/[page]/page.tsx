import prisma from "@database/prisma/instance";
import { Prisma } from "@prisma/client";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

import { Pagination } from "@/components";

import { Groups } from "./Groups";
import { RankTable } from "./RankTable";

export const metadata: Metadata = {
  title: "Rankings",
};

export const revalidate = 30;

const getUserCount = async (groupId: number) => {
  try {
    return unstable_cache(
      async () => {
        return await prisma.debugUserGroup.count({
          where: {
            groupId: groupId ? groupId : undefined,
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
  if (isNaN(parseInt(groupId)) || isNaN(parseInt(page))) {
    throw new Error("Invalid group or page");
  }

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
        <Pagination
          page={pageInt}
          baseURL={`/rankings/${groupId}/`}
          lastPage={lastPage}
        />
        <RankTable group={groupIdInt} page={pageInt} />
        {userCount - (pageInt - 1) * 50 > 10 && (
          <Pagination
            page={pageInt}
            baseURL={`/rankings/${groupId}/`}
            lastPage={lastPage}
          />
        )}
      </div>
    </>
  );
};

export default Page;
