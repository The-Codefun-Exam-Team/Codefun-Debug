import { DecoratedLink } from "@/components";

import { CONTRIBUTORS } from "./constant";

const Page = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-6 self-stretch p-6">
      {CONTRIBUTORS.map((contributor, index) => {
        return (
          <div
            key={`contributor-${index}`}
            className="divide-y-2 divide-gray-300 rounded-md border-2 border-gray-400"
          >
            <div className="p-2 text-center text-xl font-semibold"> {contributor.name}</div>
            <ul className="list-inside list-disc text-lg">
              <li>
                Github:{" "}
                <DecoratedLink href={`https://github.com/${contributor.github_username}`}>
                  {contributor.github_username}
                </DecoratedLink>{" "}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
