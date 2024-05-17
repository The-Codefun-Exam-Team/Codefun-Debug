import { Heading } from "@/components";

export const Announcements = () => (
  <div className="w-full">
    <div className="pb-4 [&>*]:!text-accent-light dark:[&>*]:!text-accent-dark">
      <Heading type="title-large">Announcements</Heading>
    </div>
    <div className="w-full">
      <Heading type="title">Welcome to Codefun Debug (BETA).</Heading>
    </div>
  </div>
);
