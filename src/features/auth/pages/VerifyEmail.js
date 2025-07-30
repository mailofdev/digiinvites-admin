// auth/pages/VerifyEmail.js
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../hooks/useAuth";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { verifyEmail, resendVerification } = useAuth();
  
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  React.useEffect(() => {
    if (token) {
      handleVerifyEmail(token);
    }
  }, [token]);

  const handleVerifyEmail = async (verificationToken) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await verifyEmail(verificationToken);
      if (result.success) {
        setMessage(result.message);
      } else {
        setError(result.error || "Email verification failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError("Email address is required to resend verification.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await resendVerification(email);
      if (result.success) {
        setMessage(result.message);
      } else {
        setError(result.error || "Failed to resend verification email.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center p-4 shadow rounded bg-white">
        <h4 className="mb-3">Verify Your Email</h4>
        
        {loading && (
          <div className="mb-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}

        {!token && !message && (
          <>
            <p className="mb-3">
              Please check your inbox for a verification link to activate your account.
            </p>
            <p className="text-muted mb-3">
              Didn't receive an email? 
              <button 
                className="btn btn-link p-0 ms-1"
                onClick={handleResendVerification}
                disabled={loading}
              >
                Resend
              </button>
            </p>
          </>
        )}

        <div className="mt-4">
          <Link to="/login" className="btn btn-primary me-2">
            Back to Login
          </Link>
          <Link to="/register" className="btn btn-outline-secondary">
            Register New Account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
