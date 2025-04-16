import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  SmartDropdown,
  SmartDropdownContent,
  SmartDropdownItem,
  SmartDropdownLabel,
  SmartDropdownSeparator,
  SmartDropdownShortcut,
  SmartDropdownTrigger,
} from "../../components/ui/smartDropdown"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../components/ui/sidebar"

export function TeamSwitcher({
  teams
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    (<SidebarMenu>
      <SidebarMenuItem>
        <SmartDropdown>
          <SmartDropdownTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </SmartDropdownTrigger>
          <SmartDropdownContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}>
            <SmartDropdownLabel className="text-xs text-muted-foreground">
              Teams
            </SmartDropdownLabel>
            {teams.map((team, index) => (
              <SmartDropdownItem key={team.name} onClick={() => setActiveTeam(team)} className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                {team.name}
                <SmartDropdownShortcut>⌘{index + 1}</SmartDropdownShortcut>
              </SmartDropdownItem>
            ))}
            <SmartDropdownSeparator />
          </SmartDropdownContent>
        </SmartDropdown>
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
