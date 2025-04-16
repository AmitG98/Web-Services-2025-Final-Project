import React from "react";
import Footer from "../Footer/Footer";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[rgb(20,20,20)] bg-cover bg-center overflow-x-hidden relative" style={{ backgroundImage: "url('/BannerEnter.png')" }}>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <img
        src="/Logo.png"
        alt="Netflix Logo"
        className="w-28 h-10 absolute top-10 left-20 right-0 z-20"
      />
      <div className="relative z-30 flex flex-col flex-grow justify-center items-center px-4 py-16">
        {children}
      </div>
      <div className="z-30 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
