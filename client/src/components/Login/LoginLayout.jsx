import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-[rgb(20,20,20)] bg-cover bg-center"
      style={{ backgroundImage: "url('/BannerEnter.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <img
        src="/Logo.png"
        alt="Netflix Logo"
        className="w-28 h-10 absolute top-10 left-20 right-0 z-20"
      />
      <div className="relative z-30">{children}</div>
    </div>
  );
};

export default LoginLayout;
