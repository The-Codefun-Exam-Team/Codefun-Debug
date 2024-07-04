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
  page: number;
  baseURL: string;
  lastPage: number;
}) => {
  const prevPage = Math.max(page - 1, 1);
  const prev5Page = Math.max(page - 5, 1);
  const nextPage = Math.min(page + 1, lastPage);
  const next5Page = Math.min(page + 5, lastPage);
  const isFirstPage = prevPage === page;
  const isFirstFivePages = prev5Page === page;
  const isLastPage = nextPage === page;
  const isLastFivePages = next5Page === page;
  const buttonClassNames =
    "p-2 text-accent-light dark:text-accent-dark justify-center flex items-center text-xl divide-[1px]";
  return (
    <nav aria-label="Navigate between pages of problems">
      <ul className="my-6 flex w-full justify-between divide-x-2 divide-accent-light overflow-hidden rounded-md border-2 border-accent-light dark:divide-accent-dark dark:border-accent-dark">
        {!isFirstFivePages && (
          <li>
            <Link
              href={`${baseURL}${prev5Page}`}
              className={clsx(
                buttonClassNames,
                "hover:bg-accent-light/10 dark:hover:bg-accent-dark/10",
              )}
              aria-label={`Go to page ${prev5Page}, jumping backward up to 5 pages.`}
            >
              <ChevronDoubleLeftIcon className="size-7 stroke-accent-light dark:stroke-accent-dark" />
            </Link>
          </li>
        )}
        {!isFirstPage && (
          <li>
            <Link
              href={`${baseURL}${prevPage}`}
              className={clsx(
                buttonClassNames,
                "hover:bg-accent-light/10 dark:hover:bg-accent-dark/10",
              )}
              aria-label={`Go to page ${prevPage}, jumping backward 1 page.`}
            >
              <ChevronLeftIcon className="size-7 stroke-accent-light dark:stroke-accent-dark" />
            </Link>
          </li>
        )}

        <li className="grow">
          <Link
            href={`${baseURL}${page}`}
            className={clsx(buttonClassNames, "w-full px-3 font-semibold")}
            aria-label={`Go to page ${page}, current page.`}
            aria-current="page"
          >
            {page}
          </Link>
        </li>

        {!isLastPage && (
          <li>
            <Link
              href={`${baseURL}${nextPage}`}
              className={clsx(
                buttonClassNames,
                "hover:bg-accent-light/10 dark:hover:bg-accent-dark/10",
              )}
              aria-label={`Go to page ${nextPage}, jumping forward 1 page.`}
            >
              <ChevronRightIcon className="size-7 stroke-accent-light dark:stroke-accent-dark" />
            </Link>
          </li>
        )}
        {!isLastFivePages && (
          <li>
            <Link
              href={`${baseURL}${next5Page}`}
              className={clsx(
                buttonClassNames,
                "hover:bg-accent-light/10 dark:hover:bg-accent-dark/10",
              )}
              aria-label={`Go to page ${next5Page}, jumping forward up to 5 pages.`}
            >
              <ChevronDoubleRightIcon className="size-7 stroke-accent-light dark:stroke-accent-dark" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
