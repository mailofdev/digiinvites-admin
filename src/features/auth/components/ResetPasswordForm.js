// auth/components/ResetPasswordForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await resetPassword(email);
      if (result.success) {
        setSuccess(result.message);
        setEmail("");
      } else {
        setError(result.error || "Password reset failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  return (
    <form className="p-4 shadow rounded bg-white" onSubmit={handleSubmit}>
      <h4 className="mb-4 text-center">Reset Password</h4>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={handleEmailChange}
          required
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-warning w-100 mb-3"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <div className="text-center">
        <p className="mb-2">
          Remember your password?{" "}
          <Link to="/login" className="text-decoration-none">
            Login here
          </Link>
        </p>
        <p className="mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
