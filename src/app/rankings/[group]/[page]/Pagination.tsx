import Link from "next/link";

export const Pagination = ({ group, page }: { group: string; page: string }) => {
  const nexpage = parseInt(page) + 1;
  const prevpage = page !== "1" ? (parseInt(page) - 1).toString() : "1";

  console.log(nexpage);
  console.log(prevpage);
  return (
    <div className="fixed bottom-0 h-fit w-full">
      <div className="mx-auto h-fit w-full max-w-5xl p-4 md:px-10">
        <div className="flex w-full justify-between">
          <Link
            href={`/rankings/${group}/${prevpage}`}
            className="h-fit w-fit border-2 border-black bg-white px-3 py-1 opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-10 w-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
          <Link
            href={`/rankings/${group}/${nexpage}`}
            className="h-fit w-fit border-2 border-black bg-white px-3 py-1 opacity-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-10 w-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
