import { cache } from "react";

import { getGroups } from "@/features/rankings";

import { GroupsClient } from "./Client";

const getGroupsData = cache(() => {
  return getGroups();
});

export const Groups = async ({ groupId }: { groupId: number }) => {
  const query = await getGroupsData();
  if (!query.ok) {
    throw new Error(query.message);
  }
  return <GroupsClient groupId={groupId} data={query.data} />;
};

Groups.preload = getGroupsData;
