import { DecoratedLink } from "@/components";

import { CONTRIBUTORS } from "./constant";

const Page = () => {
  return (
    <div className="grid h-auto w-full gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 lg:self-stretch">
      {CONTRIBUTORS.map((contributor, index) => {
        return (
          <div
            key={`contributor-${index}`}
            className="divide-y-2 divide-gray-300 rounded-md border-2 border-gray-400"
          >
            <div className="p-2 text-center text-xl font-bold"> {contributor.name}</div>
            <ul className="list-inside list-disc px-4 py-2 text-xl [&>li]:py-2">
              <li> Role: {contributor.role}</li>
              {contributor.github_username !== null && (
                <li>
                  Github:{" "}
                  <DecoratedLink
                    href={`https://github.com/${contributor.github_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contributor.github_username}
                  </DecoratedLink>{" "}
                </li>
              )}
              <li></li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
