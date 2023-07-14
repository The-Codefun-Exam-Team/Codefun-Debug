import { DecoratedLink, Heading } from "@/components";

import { CONTRIBUTORS_LIST } from "./constants";

const Page = () => (
  <div className="flex w-full flex-col gap-2 p-6 lg:px-24 lg:py-12">
    <Heading type="title-large">About us, the Codefun Debug team.</Heading>
    <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
      {CONTRIBUTORS_LIST.map(([username, { name, role, roleDescription, githubUsername }]) => (
        <div
          key={`contributor-${username}`}
          className="divide-y-2 divide-gray-300 rounded-md border-2 border-gray-400"
        >
          <div className="p-2 text-center text-xl font-bold">
            <DecoratedLink href={`/photos/${username}`}>{name}</DecoratedLink>
          </div>
          <ul className="list-inside list-disc px-4 py-2 text-xl [&>li]:py-2">
            <li>Role: {role}</li>
            {githubUsername && (
              <li>
                Github:{" "}
                <DecoratedLink
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {githubUsername}
                </DecoratedLink>{" "}
              </li>
            )}
            <li>{roleDescription}</li>
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default Page;
