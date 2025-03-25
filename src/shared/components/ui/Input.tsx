import * as React from "react";
import { cn } from "@/shared/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, ...props }, ref) => {
    // Добавляем проверку на undefined и преобразование в пустую строку
    const controlledValue = value === undefined ? "" : value;

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={controlledValue}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
