import Image from "next/image";
import { notFound } from "next/navigation";

import { CONTRIBUTORS_INFO } from "@/features/about";
import { TEAM, type TeamMembers } from "@/features/about";

import { PhotosModal } from "./PhotosModal";

export const dynamicParams = false;

export const generateStaticParams = () => TEAM.map((member) => ({ id: member }));

const Page = ({ params: { id } }: { params: { id: TeamMembers } }) => {
  const info = CONTRIBUTORS_INFO[id];
  if (!info) {
    notFound();
  }
  return (
    <PhotosModal title={`${info.name} - ${info.role}`} description={info.roleDescription}>
      {!!info.image && (
        <div className="relative h-full w-full">
          <Image src={info.image} alt={`${info.name}'s image`} className="w-full rounded-md" />
        </div>
      )}
    </PhotosModal>
  );
};

export default Page;
