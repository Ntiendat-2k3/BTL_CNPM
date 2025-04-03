import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faTicketAlt,
  faUser,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export const stats = [
  {
    title: "Tổng phim",
    value: "45",
    icon: <FontAwesomeIcon icon={faFilm} className="h-8 w-8" />,
    color: "bg-blue-600",
  },
  {
    title: "Vé đã bán",
    value: "1,234",
    icon: <FontAwesomeIcon icon={faTicketAlt} className="h-8 w-8" />,
    color: "bg-green-600",
  },
  {
    title: "Tài khoản",
    value: "589",
    icon: <FontAwesomeIcon icon={faUser} className="h-8 w-8" />,
    color: "bg-purple-600",
  },
  {
    title: "Suất chiếu",
    value: "78",
    icon: <FontAwesomeIcon icon={faClock} className="h-8 w-8" />,
    color: "bg-orange-600",
  },
];
