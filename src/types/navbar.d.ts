import { LucideProps } from "lucide-react";
declare global {
  interface UserDashBoardItemProps {
    title: string;
    url: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    items?: {
      title: string;
      url: string;
    }[];
  }

  interface UserDashBoardProps {
    data: UserDashBoardItemProps[];
  }
}
