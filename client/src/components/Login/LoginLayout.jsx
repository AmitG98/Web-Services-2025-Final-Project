const LoginLayout = ({ children }) => {
    return (
      <div className="layout-container">
        <div className="layout-overlay"></div>
        <img src="/Logo.png" alt="Logo" className="layout-logo" />
        <div className="layout-content">{children}</div>
      </div>
    );
  };
  
  export default LoginLayout;
  
  <style>
  {`
    .layout-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-image: url('/SignupBanner.png');
      background-size: cover;
      background-position: center;
      position: relative;
    }
    .layout-overlay {
      position: absolute;
      inset: 0;
      background-color: black;
      opacity: 0.6;
    }
    .layout-logo {
      position: absolute;
      top: 2rem;
      left: 2rem;
      width: 7rem;
      z-index: 10;
    }
    .layout-content {
      position: relative;
      z-index: 10;
      padding: 1.5rem;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 0.5rem;
      width: 90%;
      max-width: 32rem;
    }
  `}
  </style>
  