// auth/pages/Register.js
import React from "react";
import RegisterForm from "../components/RegisterForm";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
