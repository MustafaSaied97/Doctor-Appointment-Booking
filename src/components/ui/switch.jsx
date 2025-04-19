import * as React from "react";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef(({ 
  className,
  checked,
  onCheckedChange,
  ...props 
}, ref) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const isControlled = checked !== undefined;
  const actualChecked = isControlled ? checked : isChecked;

  const handleChange = (e) => {
    const newChecked = e.target.checked;
    if (!isControlled) setIsChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  return (
    <label
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        actualChecked ? "bg-primary" : "bg-input",
        className
      )}
    >
      <input
        {...props}
        ref={ref}
        type="checkbox"
        role="switch"
        checked={actualChecked}
        onChange={handleChange}
        className="sr-only" // Hide the actual input visually
        aria-checked={actualChecked}
      />
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
          actualChecked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </label>
  );
});

Switch.displayName = "Switch";

export { Switch };