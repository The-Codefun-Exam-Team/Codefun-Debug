"use client";
import { Menu, Transition } from "@headlessui/react";
import { clsx } from "@utils/shared";
import Link from "next/link";

import type { GroupsData } from "./types";

export const Group = ({ group, groupsData }: { group: string; groupsData: GroupsData }) => {
  const currentGroupName = groupsData.find((element) => element.id.toString() === group)?.name;
  return (
    <Menu>
      <Menu.Button
        className={clsx(
          "flex w-full items-center rounded-md border-2 border-slate-800 p-[5px] text-2xl font-semibold text-slate-800 dark:border-slate-300 dark:text-slate-300",
        )}
      >
        <div className="grow text-center">{currentGroupName}</div>
      </Menu.Button>
      <div className="relative">
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 top-2 z-10 flex h-[60vh] w-full flex-col divide-y-[1px] divide-slate-300 overflow-auto rounded-md border-2 border-slate-700 bg-white dark:divide-slate-800 dark:border-slate-400 dark:bg-slate-900">
            {groupsData.map(({ id, name }) => (
              <Menu.Item
                key={`rankings-groups-list-group-${id}`}
                disabled={name === currentGroupName}
              >
                {({ active }) => (
                  <Link
                    href={`/rankings/${id}/1`}
                    className={clsx(
                      "p-2 text-center text-xl text-slate-700 dark:text-slate-400",
                      name === currentGroupName && "hidden",
                      active && "bg-blue-50 dark:bg-sky-800/20",
                    )}
                  >
                    {name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};
