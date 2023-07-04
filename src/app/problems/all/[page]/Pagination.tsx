import Link from "next/link";

import { LeftArrowIcon, RightArrowIcon } from "@/components/icon";

export const Pagination = ({ page }: { page: string }) => {
  const nextPage = parseInt(page) + 1;
  const prevPage = page !== "1" ? (parseInt(page) - 1).toString() : "1";

  return (
    <div className="fixed bottom-0 h-fit w-full">
      <div className="mx-auto h-fit w-full max-w-4xl p-4 md:px-10">
        <div className="flex w-full justify-between">
          <Link
            href={`/problems/all/${prevPage}`}
            className="h-fit w-fit rounded-lg border-2 border-black bg-white px-3 py-1 opacity-70 transition-opacity hover:opacity-50"
            aria-label={`Move to page ${prevPage}.`}
          >
            <LeftArrowIcon className="h-10 w-10" />
          </Link>
          <Link
            href={`/problems/all/${nextPage}`}
            className="h-fit w-fit rounded-lg border-2 border-black bg-white px-3 py-1 opacity-70 transition-opacity hover:opacity-50"
            aria-label={`Move to page ${nextPage}.`}
          >
            <RightArrowIcon className="h-10 w-10" />
          </Link>
        </div>
      </div>
    </div>
  );
};
