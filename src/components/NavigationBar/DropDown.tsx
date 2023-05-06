"use client"
import { Transition } from "@headlessui/react";
import { useState } from "react";

// Using transition from headlessui, but don't seem to fucking work
export const DropDown = () => {
	const [isShowing, setIsShowing] = useState(false);
	return (
		<>
			<Transition as="span" unmount={true} show={!isShowing}>
				<label
				htmlFor="dropdown-check"
				className="absolute float-right mr-4 inline-block h-9 w-10 cursor-pointer leading-[12px] md:hidden"
				onClick={() => setIsShowing(!isShowing)}
				>
					<Transition.Child as ="span" className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
						enter="delay-300"
						enterFrom="opacity-0"
						enterTo="opacity-1"
					>
					</Transition.Child>
					<Transition.Child as="span" className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
						enter="delay-300"
						enterFrom="opacity-0"
						enterTo="opacity-1"
					>
					</Transition.Child>
					<Transition.Child as="span" className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
						enter="delay-300"
						enterFrom="opacity-0"
						enterTo="opacity-1"
					>
					</Transition.Child>
				</label>
			</Transition>

			<Transition as="span" show={isShowing}
			>
				<label
					htmlFor="dropdown-check"
					className="absolute float-right mr-4 inline-block h-9 w-10 cursor-pointer leading-[12px] md:hidden"
					onClick={() => setIsShowing(!isShowing)}
					>
					<Transition.Child as ="span" className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
						enter="transition-all ease-out-back duration-300"
						enterFrom="translate-x-0 translate-y-0 rotate-0 origin-bottom-left"
						enterTo="translate-x-[6.2px] translate-y-[-3px] rotate-45 origin-bottom-left"
						leave="transition-all ease-out-back duration-300"
						leaveFrom="translate-x-[6.2px] translate-y-[-3px] rotate-45 origin-bottom-left"
						leaveTo="translate-x-0 translate-y-0 rotate-0 origin-bottom-left"
						>
						
					</Transition.Child>
					<Transition.Child as="span" className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
						enter="duration-200 transition-all ease-out"
						enterFrom="opacity-1 w-full"
						enterTo="opacity-0 w-[1px]"
						leave="duration-200 transition-all ease-out"
						leaveFrom="opacity-1 w-0"
						leaveTo="opacity-1 w-full"
						>
					</Transition.Child>
					<Transition.Child as="span" className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
						enter="transition-all ease-out-back duration-300"
						enterFrom="translate-x-0 translate-y-0 rotate-0 origin-bottom-left"
						enterTo="translate-x-[6px] translate-y-0 rotate-[-45deg] origin-bottom-left"
						leave="transition-all ease-out-back duration-300"
						leaveFrom="translate-x-[6px] translate-y-0 rotate-[-45deg] origin-bottom-left"
						leaveTo="translate-x-0 translate-y-0 rotate-0 origin-bottom-left"
						>
					</Transition.Child>
					</label>
				</Transition>
			</>
			)
};
