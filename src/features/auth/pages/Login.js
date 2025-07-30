// auth/pages/Login.js
import React from "react";
import LoginForm from "../components/LoginForm";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
