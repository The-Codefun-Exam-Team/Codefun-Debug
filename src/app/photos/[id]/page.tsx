import Image from "next/image";
import { notFound } from "next/navigation";

import { Heading } from "@/components";
import { CONTRIBUTORS_INFO, TEAM, type TeamMembers } from "@/features/about";

import NO_IMAGE from "./no-image.png";

export const dynamicParams = false;

export const generateStaticParams = () => TEAM.map((member) => ({ id: member }));

const Page = ({ params: { id } }: { params: { id: TeamMembers } }) => {
  const info = CONTRIBUTORS_INFO[id];
  if (!info) {
    notFound();
  }
  return (
    <div className="flex w-full flex-col items-center gap-6 self-stretch p-6 md:flex-row md:justify-between md:p-24">
      <div className="md:flex-[2_2_0]">
        <Heading type="title-large">{info.name}</Heading>
        <Heading type="title">{info.roleDescription}</Heading>
      </div>
      <div className="relative size-full md:size-auto md:flex-[1_1_0] md:self-stretch">
        <Image
          src={info.image ?? NO_IMAGE}
          alt={`${info.name}'s image`}
          fill
          className="h-auto w-full rounded-md object-contain md:h-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default Page;
