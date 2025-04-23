import * as React from "react"
import {Eye, EyeOff} from 'lucide-react';
import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
    passwordToggle?: boolean;
};
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className,passwordToggle,type, ...props }, ref) => {
      const [visible, setVisible] = React.useState(false);
      const [focused, setFocused] = React.useState(false);
      const isPassword = type === "password";
      const inputType = isPassword && passwordToggle ? (visible? "text" : "password"):type;
      const handleBlur = () => {
          setFocused(false);
          if (visible) setVisible(false);
      };

      const handleFocus = () => {
          setFocused(true);
      };
    return (
        <div
            onFocus={handleFocus}
            onBlur={handleBlur}
            className='relative'>
      <input
        type={inputType}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
            {isPassword && passwordToggle && (
                <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground  focus:outline-none transition"
                    tabIndex={-1}
                >
                    {visible ? <Eye size={20} strokeWidth={1.4}/> : <EyeOff size={20} strokeWidth={1.4}/>}
                </button>
            )}
        </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
