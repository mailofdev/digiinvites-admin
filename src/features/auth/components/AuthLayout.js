// auth/components/AuthLayout.js
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-6 col-lg-4">
        <div className="auth-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
