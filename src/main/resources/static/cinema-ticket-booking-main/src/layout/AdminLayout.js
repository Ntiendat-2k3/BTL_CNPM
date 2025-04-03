import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome } from "@fortawesome/free-solid-svg-icons";
import { navigation } from "../constants/navigation";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800">
          <div className="flex items-center justify-end p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
          </div>
          <nav className="px-4 py-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg mb-2"
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 h-full bg-gray-800 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          {isSidebarOpen && (
            <h1 className="text-white text-xl font-bold">Admin</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            {isSidebarOpen ? (
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            )}
          </button>
        </div>
        <nav className="p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg mb-2 ${
                !isSidebarOpen ? "justify-center" : ""
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`md:ml-${
          isSidebarOpen ? "64" : "20"
        } transition-margin duration-300`}
      >
        <header className="bg-gray-800 p-4 flex items-center justify-between md:justify-end border-b border-gray-700">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
          <Link
            to="/"
            className="text-gray-300 hover:text-white flex items-center"
          >
            <FontAwesomeIcon icon={faHome} className="h-5 w-5 mr-1" />
            Về trang chủ
          </Link>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
