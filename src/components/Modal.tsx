"use client";
import { Dialog, Transition } from "@headlessui/react";
import type { ReactNode } from "react";
import { Fragment } from "react";

import { CrossIcon } from "@/components/icon";

export interface ModalProps {
  /** The function used to close the modal. */
  closeModal(): void;
  /** This decides whether the modal is shown or not. */
  show: boolean;
  /** This modal's title. */
  title?: string;
  /** This modal's description. */
  description?: string;
  /** This modal's children */
  children: ReactNode;
}

export const Modal = ({ show, closeModal, title, description, children }: ModalProps) => (
  <>
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" aria-hidden />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-xl bg-white p-6  text-left align-middle shadow-xl transition-all dark:bg-slate-900">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-300"
                    >
                      {title}
                    </Dialog.Title>
                    <Dialog.Title
                      as="h4"
                      className="text-sm font-medium leading-5 text-gray-900 dark:text-slate-300"
                    >
                      {description}
                    </Dialog.Title>
                  </div>
                  <button
                    onClick={closeModal}
                    className="rounded-md p-2 transition-colors duration-100 hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    <CrossIcon className="h-6 w-6" />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
);
