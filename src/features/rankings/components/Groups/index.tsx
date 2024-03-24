import { cache } from "react";

import { getGroups } from "@/features/rankings";

import { GroupsClient } from "./Client";

const getGroupsData = cache(() => {
  return getGroups();
});

const Groups = async ({ group }: { group: string }) => {
  const data = await getGroupsData();
  return <GroupsClient group={group} data={data} />;
};

Groups.preload = getGroupsData;

export { Groups };
