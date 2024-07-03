import { H1, H2 } from "@/components";

const NotFound = () => (
  <div className="flex w-full items-center justify-center self-stretch">
    <div className="flex flex-col gap-3">
      <H2>Error {":("}</H2>
      <H1>Page not found...?</H1>
      <H2>Double check the URL, and try reloading!</H2>
    </div>
  </div>
);

export default NotFound;
