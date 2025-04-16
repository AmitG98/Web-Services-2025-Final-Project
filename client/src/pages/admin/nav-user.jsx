"use client";

import {
  ChevronsUpDown,
  LogOut,
} from "lucide-react";

import { UserAvatar, UserAvatarImage, UserAvatarFallback } from "../../components/ui/avatar";
import {
  SmartDropdown,
  SmartDropdownContent,
  SmartDropdownGroup,
  SmartDropdownItem,
  SmartDropdownLabel,
  SmartDropdownSeparator,
  SmartDropdownTrigger,
} from "../../components/ui/smartDropdown";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../components/ui/sidebar";
import { useAuth } from "../../context/authContext";

export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SmartDropdown>
          <SmartDropdownTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar className="h-8 w-8 rounded-lg">
                <UserAvatarImage src={user.avatar} alt={user.name} />
                <UserAvatarFallback className="rounded-lg">CN</UserAvatarFallback>
              </UserAvatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </SmartDropdownTrigger>
          <SmartDropdownContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <SmartDropdownLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar className="h-8 w-8 rounded-lg">
                  <UserAvatarImage src={user.avatar} alt={user.name} />
                  <UserAvatarFallback className="rounded-lg">CN</UserAvatarFallback>
                </UserAvatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </SmartDropdownLabel>
            <SmartDropdownGroup></SmartDropdownGroup>
            <SmartDropdownSeparator />
            <SmartDropdownItem onClick={handleLogout}>
              <LogOut />
              Log out
            </SmartDropdownItem>
          </SmartDropdownContent>
        </SmartDropdown>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
