import React from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center z-30 relative">
        <LoginForm />
      </div>
    </AuthLayout>
  );
};

export default Login;
