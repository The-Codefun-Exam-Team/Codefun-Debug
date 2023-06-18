import Link from "next/link";

import type { GroupsData } from "./types";

// const DropDown = ({ groupsData }: { groupsData: GroupData }) => {

// };

export const Group = ({ group, groupsData }: { group: string; groupsData: GroupsData }) => {
  let name = groupsData.find((element) => {
    return element.id.toString() === group;
  })?.name;
  if (name === undefined) {
    name = "Global";
  }

  return (
    <>
      <input type="checkbox" id="dropdown-group" className="peer hidden" />
      <label
        htmlFor="dropdown-group"
        className="relative mb-2 flex h-12 w-full cursor-pointer border-2 border-black
        peer-checked:[&>svg]:rotate-0
      "
      >
        <div className="mx-auto h-full w-min  p-2 text-xl">{name}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="absolute right-0 h-full w-12 rotate-180 transition-all duration-300"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </label>
      {/* Need to hardcode height for the animation to work (desired height it is) */}
      <div className="relative h-fit w-full peer-checked:[&>:nth-child(1)]:h-96 peer-checked:[&>:nth-child(1)]:opacity-100">
        {/* Switch from reltive to absolute depending on desired behaviour */}
        <div
          className="absolute z-10 h-0 w-full border-2 border-black
          bg-white opacity-0 transition-all duration-300 ease-out"
        ></div>
      </div>
      <h1>fjklsdj;lfkdskl</h1>
    </>
  );
};
