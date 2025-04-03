import {
  ClockIcon,
  FilmIcon,
  TicketIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

export const menuItems = [
  {
    title: "Quản lý phim",
    path: "/manage_movies",
    icon: <FilmIcon className="w-8 h-8 mb-2" />,
    color: "bg-blue-500",
  },
  {
    title: "Quản lý số vé bán được",
    path: "/manage_tickets",
    icon: <TicketIcon className="w-8 h-8 mb-2" />,
    color: "bg-green-500",
  },
  {
    title: "Quản lý tài khoản",
    path: "/manage_accounts",
    icon: <UserGroupIcon className="w-8 h-8 mb-2" />,
    color: "bg-purple-500",
  },
  {
    title: "Quản lý suất chiếu",
    path: "/manage_showtimes",
    icon: <ClockIcon className="w-8 h-8 mb-2" />,
    color: "bg-orange-500",
  },
];
