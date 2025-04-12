import React from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import RegisterForm from "../components/Auth/RegisterForm";
import SiteFooter from "../components/Footer/Footer";

function Register() {
  return (
    <>
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
      <SiteFooter />
    </>
  );
}

export default Register;
