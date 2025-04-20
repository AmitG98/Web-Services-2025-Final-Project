import React, { forwardRef } from "react";
import * as RDropdown from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";

const SmartDropdown = RDropdown.Root;
const SmartDropdownTrigger = RDropdown.Trigger;
const SmartDropdownGroup = RDropdown.Group;
const SmartDropdownPortal = RDropdown.Portal;
const SmartDropdownSub = RDropdown.Sub;
const SmartDropdownRadioGroup = RDropdown.RadioGroup;

const SmartDropdownSubTrigger = forwardRef(({ className, inset, children, ...props }, ref) => (
  <RDropdown.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </RDropdown.SubTrigger>
));
SmartDropdownSubTrigger.displayName = "SmartDropdownSubTrigger";

const SmartDropdownSubContent = forwardRef(({ className, ...props }, ref) => (
  <RDropdown.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in",
      className
    )}
    {...props}
  />
));
SmartDropdownSubContent.displayName = "SmartDropdownSubContent";

const SmartDropdownContent = forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <RDropdown.Portal>
    <RDropdown.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in",
        className
      )}
      {...props}
    />
  </RDropdown.Portal>
));
SmartDropdownContent.displayName = "SmartDropdownContent";

const SmartDropdownItem = forwardRef(({ className, inset, ...props }, ref) => (
  <RDropdown.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
SmartDropdownItem.displayName = "SmartDropdownItem";

const SmartDropdownCheckbox = forwardRef(({ className, children, checked, ...props }, ref) => (
  <RDropdown.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      "relative flex items-center py-1.5 pl-8 pr-2 text-sm transition-colors focus:bg-accent",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <RDropdown.ItemIndicator>
        <Check className="h-4 w-4" />
      </RDropdown.ItemIndicator>
    </span>
    {children}
  </RDropdown.CheckboxItem>
));
SmartDropdownCheckbox.displayName = "SmartDropdownCheckbox";

const SmartDropdownRadio = forwardRef(({ className, children, ...props }, ref) => (
  <RDropdown.RadioItem
    ref={ref}
    className={cn(
      "relative flex items-center py-1.5 pl-8 pr-2 text-sm transition-colors focus:bg-accent",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <RDropdown.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </RDropdown.ItemIndicator>
    </span>
    {children}
  </RDropdown.RadioItem>
));
SmartDropdownRadio.displayName = "SmartDropdownRadio";

const SmartDropdownLabel = forwardRef(({ className, inset, ...props }, ref) => (
  <RDropdown.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
SmartDropdownLabel.displayName = "SmartDropdownLabel";

const SmartDropdownSeparator = forwardRef(({ className, ...props }, ref) => (
  <RDropdown.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SmartDropdownSeparator.displayName = "SmartDropdownSeparator";

const SmartDropdownShortcut = ({ className, ...props }) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
);

SmartDropdownShortcut.displayName = "SmartDropdownShortcut";

export {
  SmartDropdown,
  SmartDropdownTrigger,
  SmartDropdownContent,
  SmartDropdownItem,
  SmartDropdownCheckbox,
  SmartDropdownRadio,
  SmartDropdownLabel,
  SmartDropdownSeparator,
  SmartDropdownShortcut,
  SmartDropdownGroup,
  SmartDropdownPortal,
  SmartDropdownSub,
  SmartDropdownSubContent,
  SmartDropdownSubTrigger,
  SmartDropdownRadioGroup,
};
