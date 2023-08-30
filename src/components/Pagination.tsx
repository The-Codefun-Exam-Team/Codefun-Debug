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
    "p-1 w-fit h-fit my-4 mx-1 text-sky-500 border-2 border-sky-500 rounded-md w-8 text-center flex items-center";
  return (
    <div className="flex w-full justify-between">
      <div className="flex w-fit">
        <Link
          href={`${baseURL}${prev5Page}`}
          className={clsx(buttonClassNames, "hover:bg-sky-900/30")}
          aria-label={`Move to page ${prev5Page}.`}
        >
          <ChevronDoubleLeftIcon className="h-6 w-6 stroke-sky-500" />
        </Link>
        <Link
          href={`${baseURL}${prevPage}`}
          className={clsx(buttonClassNames, "hover:bg-sky-900/30")}
          aria-label={`Move to page ${prevPage}.`}
        >
          <ChevronLeftIcon className="h-6 w-6 stroke-sky-500" />
        </Link>
      </div>

      <div className={clsx(buttonClassNames, "px-3 font-semibold")}>{page}</div>

      <div className="flex w-fit">
        <Link
          href={`${baseURL}${nextPage}`}
          className={clsx(buttonClassNames, "hover:bg-sky-900/30")}
          aria-label={`Move to page ${nextPage}.`}
        >
          <ChevronRightIcon className="h-6 w-6 stroke-sky-500" />
        </Link>
        <Link
          href={`${baseURL}${next5Page}`}
          className={clsx(buttonClassNames, "hover:bg-sky-900/30")}
          aria-label={`Move to page ${next5Page}.`}
        >
          <ChevronDoubleRightIcon className="h-6 w-6 stroke-sky-500" />
        </Link>
      </div>
    </div>
  );
};
