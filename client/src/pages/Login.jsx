import React from "react";
import LoginLayout from "../components/Login/LoginLayout";
import LoginForm from "../components/Login/LoginForm";
import Footer from "../components/Footer/Footer";

const Login = () => {
  return (
    <LoginLayout>
      <div className="flex flex-col items-center z-30 relative">
        <LoginForm />
        <Footer />
      </div>
    </LoginLayout>
  );
};

export default Login;
