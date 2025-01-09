import {
  BookOpen,
  Settings2,
  SquareTerminal,
  CreditCard,
  Bell,
} from "lucide-react";

export const UserData = {
  navMain: [
    {
      title: "Vehicles",
      url: "",
      icon: SquareTerminal,
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
