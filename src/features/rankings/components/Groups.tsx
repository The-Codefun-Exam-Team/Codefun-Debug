import { cache } from "react";

import { getGroups } from "../query/getGroups";
import { GroupsClient } from "./GroupsClient";

const getGroupsData = cache(() => {
  return getGroups();
});

const Groups = async ({ group }: { group: string }) => {
  const data = await getGroupsData();
  return <GroupsClient group={group} data={data} />;
};

Groups.preload = getGroupsData;

export { Groups };
