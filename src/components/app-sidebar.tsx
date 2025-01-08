import * as React from "react";
import {
  BookOpen,
  Settings2,
  SquareTerminal,
  CreditCard,
  Bell,
} from "lucide-react";

import { NavMain } from "../components/nav-main";
import { NavUser } from "../components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Vehicles",
      url: "",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add New ",
          url: "/user/vehicle/add-new",
        },
        {
          title: "View All",
          url: "/user",
        },
      ],
    },
    {
      title: "Payments",
      url: "",
      icon: CreditCard,
      items: [
        {
          title: "Add a Card",
          url: "/user/payments/add-card",
        },
        {
          title: "View All ",
          url: "/user/payments/view-cards",
        },
        {
          title: "History",
          url: "/user/payments/history",
        },
      ],
    },
    {
      title: "Notifications",
      url: "/user/notifications",
      icon: Bell,
    },
    {
      title: "Send Message",
      url: "/user/send-message",
      icon: Settings2,
    },
    {
      title: "Help",
      url: "/user/help",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center space-x-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"></div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Sri Lankan Highway</span>
            <span className="truncate text-xs">Government</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
