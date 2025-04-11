import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="form-wrapper">
      <div className="form-overlay"></div>
      <img src="/Logo.png" alt="Logo" className="form-logo" />
      {children}

      <style>{`
        .form-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #141414;
          position: relative;
        }
        .form-overlay {
          position: absolute;
          inset: 0;
          background: black;
          opacity: 0.5;
        }
        .form-logo {
          position: absolute;
          top: 2rem;
          left: 3rem;
          width: 7rem;
        }
      `}</style>
    </div>
  );
}

export default AuthLayout;
