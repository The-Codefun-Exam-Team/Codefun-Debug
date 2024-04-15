import Link from "next/link";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icon";
import { clsx } from "@/utils";

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
    "p-2 w-fit h-fit text-accent-light dark:text-accent-dark w-8 text-center flex items-center text-xl divide-[1px]";
  return (
    <div className="my-6 flex w-full justify-between divide-x-2 divide-accent-light overflow-hidden rounded-md border-2 border-accent-light dark:divide-accent-dark dark:border-accent-dark">
      <div className="flex w-fit divide-x-2 divide-accent-light dark:divide-accent-dark">
        <Link
          href={`${baseURL}${prev5Page}`}
          className={clsx(
            buttonClassNames,
            prev5Page !== pageInt && "hover:bg-accent-light/10 dark:hover:bg-accent-dark/10",
          )}
          aria-label={`Move to page ${prev5Page}.`}
        >
          <ChevronDoubleLeftIcon className="h-7 w-7 stroke-accent-light dark:stroke-accent-dark" />
        </Link>
        <Link
          href={`${baseURL}${prevPage}`}
          className={clsx(
            buttonClassNames,
            prevPage !== pageInt && "hover:bg-accent-light/10 dark:hover:bg-accent-dark/10",
          )}
          aria-label={`Move to page ${prevPage}.`}
        >
          <ChevronLeftIcon className="h-7 w-7 stroke-accent-light dark:stroke-accent-dark" />
        </Link>
      </div>

      <div className={clsx(buttonClassNames, "grow px-3 font-semibold")}>
        <div className="w-full text-center">{page}</div>
      </div>

      <div className="flex w-fit divide-x-2 divide-accent-light dark:divide-accent-dark">
        <Link
          href={`${baseURL}${nextPage}`}
          className={clsx(
            buttonClassNames,
            nextPage !== pageInt && "hover:bg-accent-light/10 dark:hover:bg-accent-dark/10",
          )}
          aria-label={`Move to page ${nextPage}.`}
        >
          <ChevronRightIcon className="h-7 w-7 stroke-accent-light dark:stroke-accent-dark" />
        </Link>
        <Link
          href={`${baseURL}${next5Page}`}
          className={clsx(
            buttonClassNames,
            next5Page !== pageInt && "hover:bg-accent-light/10 dark:hover:bg-accent-dark/10",
          )}
          aria-label={`Move to page ${next5Page}.`}
        >
          <ChevronDoubleRightIcon className="h-7 w-7 stroke-accent-light dark:stroke-accent-dark" />
        </Link>
      </div>
    </div>
  );
};
