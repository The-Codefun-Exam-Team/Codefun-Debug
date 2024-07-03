import { cache } from "react";

import { getGroups } from "@/features/rankings";

import { GroupsClient } from "./Client";

const getGroupsData = cache(() => {
  return getGroups();
});

export const Groups = async ({ groupId }: { groupId: number }) => {
  const data = await getGroupsData();
  return <GroupsClient groupId={groupId} data={data} />;
};

Groups.preload = getGroupsData;
