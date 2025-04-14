import * as React from "react";
import * as DropdownBase from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../../lib/utils";

const CusMenuDropdown = DropdownBase.Root;
const CusMenuTrigger = DropdownBase.Trigger;
const CusMenuGroup = DropdownBase.Group;
const CusMenuPortal = DropdownBase.Portal;
const CusMenuSub = DropdownBase.Sub;
const CusMenuRadioGroup = DropdownBase.RadioGroup;

const CusMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <DropdownBase.SubTrigger
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
    </DropdownBase.SubTrigger>
  )
);
CusMenuSubTrigger.displayName = DropdownBase.SubTrigger.displayName;

const CusMenuSubContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownBase.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  )
);
CusMenuSubContent.displayName = DropdownBase.SubContent.displayName;

const CusMenuContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownBase.Portal>
      <DropdownBase.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
          className
        )}
        {...props}
      />
    </DropdownBase.Portal>
  )
);
CusMenuContent.displayName = DropdownBase.Content.displayName;

const CusMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownBase.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
);
CusMenuItem.displayName = DropdownBase.Item.displayName;

const CusMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <DropdownBase.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownBase.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownBase.ItemIndicator>
      </span>
      {children}
    </DropdownBase.CheckboxItem>
  )
);
CusMenuCheckboxItem.displayName = DropdownBase.CheckboxItem.displayName;

const CusMenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DropdownBase.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownBase.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownBase.ItemIndicator>
      </span>
      {children}
    </DropdownBase.RadioItem>
  )
);
CusMenuRadioItem.displayName = DropdownBase.RadioItem.displayName;

const CusMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownBase.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
);
CusMenuLabel.displayName = DropdownBase.Label.displayName;

const CusMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownBase.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...props}
    />
  )
);
CusMenuSeparator.displayName = DropdownBase.Separator.displayName;

const CusMenuShortcut = ({ className, ...props }) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
CusMenuShortcut.displayName = "CusMenuShortcut";

export {
  CusMenuDropdown,
  CusMenuTrigger,
  CusMenuContent,
  CusMenuItem,
  CusMenuCheckboxItem,
  CusMenuRadioItem,
  CusMenuLabel,
  CusMenuSeparator,
  CusMenuShortcut,
  CusMenuGroup,
  CusMenuPortal,
  CusMenuSub,
  CusMenuSubContent,
  CusMenuSubTrigger,
  CusMenuRadioGroup,
};
