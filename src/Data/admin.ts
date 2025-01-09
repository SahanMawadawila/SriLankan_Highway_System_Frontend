import { Settings2, SquareTerminal, Bell } from "lucide-react";

export const AdminData = {
  navMain: [
    {
      title: "Verify",
      url: "",
      icon: SquareTerminal,
      items: [
        {
          title: "Verify User",
          url: "/admin/verify/user",
        },
        {
          title: "Verify Vehicle",
          url: "/admin/verify/vehicle",
        },
      ],
    },
    {
      title: "Interchanges",
      url: "/admin",
      icon: Settings2,
    },

    {
      title: "Notifications",
      url: "/admin/notifications",
      icon: Bell,
    },
  ],
};
