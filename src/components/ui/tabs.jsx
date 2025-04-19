import * as React from "react";
import { cn } from "@/lib/utils";

const TabsContext = React.createContext();

const Tabs = ({ value, onValueChange, defaultValue, children }) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalValue;

  const handleValueChange = (newValue) => {
    if (!isControlled) setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, handleValueChange }}>
      <div className="tabs-root">{children}</div>
    </TabsContext.Provider>
  );
};

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tab component must be wrapped in <Tabs>");
  }
  return context;
};

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  const { activeTab, handleValueChange } = useTabsContext();
  const tabs = React.Children.toArray(children);

  const handleKeyDown = (e) => {
    const currentIndex = tabs.findIndex(t => t.props.value === activeTab);
    
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        handleValueChange(tabs[prevIndex].props.value);
        break;
      case "ArrowRight":
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % tabs.length;
        handleValueChange(tabs[nextIndex].props.value);
        break;
    }
  };

  return (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isActive: child.props.value === activeTab
          });
        }
        return child;
      })}
    </div>
  );
});

const TabsTrigger = React.forwardRef(({ 
  className, 
  value, 
  isActive,
  children, 
  ...props 
}, ref) => {
  const { handleValueChange } = useTabsContext();

  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive && "bg-background text-foreground shadow-sm",
        className
      )}
      onClick={() => handleValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ 
  className, 
  value, 
  children, 
  ...props 
}, ref) => {
  const { activeTab } = useTabsContext();

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {activeTab === value && children}
    </div>
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };