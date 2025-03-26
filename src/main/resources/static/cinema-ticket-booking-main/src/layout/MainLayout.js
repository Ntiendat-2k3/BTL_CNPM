import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-1 max-w-screen-xl mx-auto p-6">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
