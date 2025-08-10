"use client";

import * as React from "react";

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  indeterminate?: boolean;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function CheckboxComponent(
    { className, indeterminate = false, ...props },
    ref,
  ) {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <input
        ref={innerRef}
        type="checkbox"
        className={
          className ??
          "h-4 w-4 shrink-0 rounded border border-input shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        }
        {...props}
      />
    );
  },
);

Checkbox.displayName = "Checkbox";


