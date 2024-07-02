import { H2, H3 } from "@/components";

export const Announcements = () => (
  <div className="w-full">
    <div className="pb-4 [&>*]:!text-accent-light dark:[&>*]:!text-accent-dark">
      <H2>Announcements</H2>
    </div>
    <div className="w-full">
      <H3>Welcome to Codefun Debug (BETA).</H3>
    </div>
  </div>
);
