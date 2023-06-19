import { createNamespaceComponent } from "@utils/shared";
import type { Optional, RequireFields } from "@utils/types";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { InputErrorText } from "./InputErrorText";
import type { LabelProps } from "./InputLabel";
import { InputLabel } from "./InputLabel";

export type InputProps = RequireFields<
  Omit<ComponentPropsWithoutRef<"input">, "className">,
  "id"
> & {
  label?: string;
  labelProps?: Optional<LabelProps, "htmlFor">;
} & (
    | {
        error?: never;
        errorTextId?: never;
        errorText?: never;
      }
    | {
        error: boolean;
        errorTextId: string;
        errorText?: string;
      }
  );

const _Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, errorTextId, errorText, id, label, labelProps, ...rest }, ref) => (
    <>
      {label && (
        <InputLabel htmlFor={id} {...labelProps}>
          {label}
        </InputLabel>
      )}
      <input
        id={id}
        className="w-full border-2 border-slate-600 p-2.5 text-lg transition-opacity disabled:opacity-50"
        aria-invalid={error}
        aria-describedby={errorTextId}
        ref={ref}
        {...rest}
      />
      {errorText && errorTextId && <InputErrorText id={errorTextId}>{errorText}</InputErrorText>}
    </>
  ),
);

_Input.displayName = "Input";

export const Input = createNamespaceComponent(_Input, {
  Label: InputLabel,
  ErrorText: InputErrorText,
});
