import { clsx } from "@utils/shared";
import Link from "next/link";

import type { GroupsData } from "./types";

export const Group = ({ group, groupsData }: { group: string; groupsData: GroupsData }) => {
  groupsData.push({ id: 0, name: "Global" });
  groupsData.reverse();
  const name = groupsData.find((element) => {
    return element.id.toString() === group;
  })?.name;

  return (
    <>
      <input type="checkbox" id="dropdown-group" className="peer hidden" />
      <label
        htmlFor="dropdown-group"
        className={clsx(
          "relative mb-2 flex h-12 w-full cursor-pointer border-2 border-black",
          "peer-checked:[&>svg]:rotate-0",
        )}
      >
        <div className="mx-auto h-full w-fit  p-2 text-xl">{name}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="absolute right-2 h-full w-10 rotate-180 transition-all duration-300"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </label>
      <div
        className={clsx(
          "relative h-fit w-full",
          "peer-checked:[&>:nth-child(1)]:h-[70vh] peer-checked:[&>:nth-child(1)]:opacity-100",
        )}
      >
        <div
          className={clsx(
            "absolute z-10 h-0 w-full overflow-y-auto border-2 border-black bg-white opacity-0",
            "transition-all duration-300 ease-out",
          )}
        >
          {groupsData.map(({ id, name }) => (
            <Link
              href={`/rankings/${id}/1`}
              key={`group-${global}-id-${id}`}
              className={clsx(
                "block h-12 w-full p-2 text-center text-lg",
                id + "" === group ? "bg-gray-200" : "hover:bg-gray-200",
              )}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
