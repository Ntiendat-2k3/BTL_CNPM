import {
  faChartBar,
  faClock,
  faFilm,
  faTicketAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: <FontAwesomeIcon icon={faChartBar} className="h-6 w-6" />,
  },
  {
    name: "Phim",
    href: "/admin/movies",
    icon: <FontAwesomeIcon icon={faFilm} className="h-6 w-6" />,
  },
  {
    name: "Vé",
    href: "/admin/tickets",
    icon: <FontAwesomeIcon icon={faTicketAlt} className="h-6 w-6" />,
  },
  {
    name: "Tài khoản",
    href: "/admin/accounts",
    icon: <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />,
  },
  {
    name: "Suất chiếu",
    href: "/admin/showtimes",
    icon: <FontAwesomeIcon icon={faClock} className="h-6 w-6" />,
  },
];
