import { Heading } from "@/components";

const NotFound = () => (
  <div className="flex w-full items-center justify-center self-stretch">
    <div className="flex flex-col gap-3">
      <Heading type="title-large">{":("}</Heading>
      <Heading type="display">Page not found...?</Heading>
      <Heading type="title-large">Double check the URL, and try reloading!</Heading>
    </div>
  </div>
);

export default NotFound;
