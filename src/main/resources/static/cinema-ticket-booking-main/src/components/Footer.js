import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center max-w-screen-xl">
        <p>&copy; 2025 Cine Royale. All Rights Reserved.</p>
        <div className="flex justify-center mt-4 space-x-6">
          <Link href="#" className="text-gray-400 hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            Terms of Service
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            Help
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
