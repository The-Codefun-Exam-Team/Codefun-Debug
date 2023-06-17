import type { GroupsData } from "./types";

// const DropDown = ({ groupsData }: { groupsData: GroupData }) => {

// };

export const Group = ({ group, groupsData }: { group: number; groupsData: GroupsData }) => {
  let name = groupsData.find((element) => element.id === group)?.name;
  if (name === undefined) {
    name = "Global";
  }
  console.log(name, group);
  return <div className="h-10 w-full bg-red-500"></div>;
};
