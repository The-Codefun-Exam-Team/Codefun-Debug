"use client";
import { useRouter } from "next/navigation";

import type { ModalProps } from "@/components";
import { Modal } from "@/components";

export const PhotosModal = (props: Omit<ModalProps, "closeModal" | "show">) => {
  const router = useRouter();

  return <Modal show closeModal={router.back} {...props} />;
};
