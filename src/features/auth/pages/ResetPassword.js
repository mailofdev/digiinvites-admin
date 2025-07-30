// auth/pages/ResetPassword.js
import React from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";
import AuthLayout from "../components/AuthLayout";

const ResetPassword = () => {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;
