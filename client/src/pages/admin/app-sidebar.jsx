import * as React from "react";
import {
  GalleryVerticalEnd,
  ListChecks,
  Database,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../components/ui/sidebar";
import { useAuth } from "../../context/authContext";

export function AppSidebar({ ...props }) {
  const { user } = useAuth();

  const data = {
    user: {
      name: user?.username,
      email: user?.email,
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Netflix Administrator",
        logo: GalleryVerticalEnd,
      }
    ],
    navMain: [
      {
        title: "Logs",
        url: "/admin-dashboard",
        icon: ListChecks,
        isActive: true,
        items: [],
      },
      {
        title: "Data Management",
        url: "/admin-dashboard/data-management",
        icon: Database,
        items: [],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
