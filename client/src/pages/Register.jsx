import React from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import RegisterForm from "../components/Auth/RegisterForm";

function Register() {
  return (
    <>
      <AuthLayout>
        <div className="flex flex-col items-center z-30 relative">
          <RegisterForm />
        </div>
      </AuthLayout>
    </>
  );
}

export default Register;
