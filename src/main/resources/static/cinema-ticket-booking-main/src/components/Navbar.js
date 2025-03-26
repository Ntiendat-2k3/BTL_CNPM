import React from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../constants/navLinks";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex space-x-8">
        {NAV_LINKS.map((link) => (
          <li key={link.to} className="group">
            <Link
              to={link.to}
              className="relative hover:text-gray-300 transition-all duration-300"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
