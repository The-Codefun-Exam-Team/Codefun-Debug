import { clsx } from "@utils/shared";
import Link from "next/link";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icon";

export const Pagination = ({
  page,
  baseURL,
  lastPage,
}: {
  page: string;
  baseURL: string;
  lastPage: string;
}) => {
  const lastPageInt = parseInt(lastPage);
  const pageInt = parseInt(page);
  const prevPage = Math.max(pageInt - 1, 1);
  const prev5Page = Math.max(pageInt - 5, 1);
  const nextPage = Math.min(pageInt + 1, lastPageInt);
  const next5Page = Math.min(pageInt + 5, lastPageInt);
  const buttonClassNames =
    "p-2 w-fit h-fit text-blue-500 dark:text-sky-300 w-8 text-center flex items-center text-xl divide-[1px]";
  return (
    <div className="my-6 flex w-full justify-between divide-x-2 divide-blue-500 overflow-hidden rounded-md border-2 border-blue-500 dark:divide-sky-300 dark:border-sky-300">
      <div className="flex w-fit divide-x-2 divide-blue-500 dark:divide-sky-300">
        <Link
          href={`${baseURL}${prev5Page}`}
          className={clsx(buttonClassNames, "hover:bg-blue-50 dark:hover:bg-sky-900/30")}
          aria-label={`Move to page ${prev5Page}.`}
        >
          <ChevronDoubleLeftIcon className="h-7 w-7 stroke-blue-500 dark:stroke-sky-300" />
        </Link>
        <Link
          href={`${baseURL}${prevPage}`}
          className={clsx(buttonClassNames, "hover:bg-blue-50 dark:hover:bg-sky-900/30")}
          aria-label={`Move to page ${prevPage}.`}
        >
          <ChevronLeftIcon className="h-7 w-7 stroke-blue-500 dark:stroke-sky-300" />
        </Link>
      </div>

      <div className={clsx(buttonClassNames, "grow px-3 font-semibold")}>
        <div className="w-full text-center">{page}</div>
      </div>

      <div className="flex w-fit divide-x-2 divide-blue-500 dark:divide-sky-300">
        <Link
          href={`${baseURL}${nextPage}`}
          className={clsx(buttonClassNames, "hover:bg-blue-50 dark:hover:bg-sky-900/30")}
          aria-label={`Move to page ${nextPage}.`}
        >
          <ChevronRightIcon className="h-7 w-7 stroke-blue-500 dark:stroke-sky-300" />
        </Link>
        <Link
          href={`${baseURL}${next5Page}`}
          className={clsx(buttonClassNames, "hover:bg-blue-50 dark:hover:bg-sky-900/30")}
          aria-label={`Move to page ${next5Page}.`}
        >
          <ChevronDoubleRightIcon className="h-7 w-7 stroke-blue-500 dark:stroke-sky-300" />
        </Link>
      </div>
    </div>
  );
};
