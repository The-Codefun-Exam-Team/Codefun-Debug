"use client";
import { RadioGroup } from "@headlessui/react";

import { ComputerIcon, MoonIcon, SunIcon } from "@/components/icon";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setScheme } from "@/store/redux";
import { clsx } from "@/utils";

export const DarkModeToggler = () => {
  const { selectedScheme: colorScheme, isSystemScheme } = useAppSelector((state) => state.color);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-2 px-3 py-2 font-semibold transition-colors duration-100">
      <span>Theme</span>
      <RadioGroup
        value={isSystemScheme ? null : colorScheme}
        onChange={(value) => {
          dispatch(setScheme(value));
        }}
        className="flex w-full justify-between [&>*]:cursor-pointer"
      >
        <RadioGroup.Option value="dark" title="Dark">
          {({ checked }) => (
            <div
              className={clsx(
                "size-fit rounded-md border-2 p-1 transition-colors duration-200",
                checked
                  ? "border-accent-light dark:border-accent-dark"
                  : "border-transparent hover:border-accent-light/40 hover:dark:border-accent-dark/40",
              )}
            >
              <MoonIcon
                className="size-6 stroke-accent-light dark:stroke-accent-dark"
                aria-label="Dark"
              />
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value={null} title="Default">
          {({ checked }) => (
            <div
              className={clsx(
                "size-fit rounded-md border-2 p-1 transition-colors duration-200",
                checked
                  ? "border-accent-light dark:border-accent-dark"
                  : "border-transparent hover:border-accent-light/40 hover:dark:border-accent-dark/40",
              )}
            >
              <ComputerIcon
                className="size-6 stroke-accent-light dark:stroke-accent-dark"
                aria-label="System"
              />
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="light" title="Light">
          {({ checked }) => (
            <div
              className={clsx(
                "size-fit rounded-md border-2 p-1 transition-colors duration-200",
                checked
                  ? "border-accent-light dark:border-accent-dark"
                  : "border-transparent hover:border-accent-light/40 hover:dark:border-accent-dark/40",
              )}
            >
              <SunIcon
                className="size-6 stroke-accent-light dark:stroke-accent-dark"
                aria-label="Light"
              />
            </div>
          )}
        </RadioGroup.Option>
      </RadioGroup>
    </div>
  );
};
