// auth/components/LoginForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import routes from "../../../components/navigation/Routes";
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(formData.email, formData.password);
      if (!result.success) {
        setError(result.error || "Login failed. Please try again.");
      } else {
        navigate(routes?.[0]?.href); // Redirect to first tab after successful login
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-4 shadow rounded " onSubmit={handleSubmit}>
      <h4 className="mb-4 text-center">Login</h4>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary w-100 mb-3"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="text-center">
        <p className="mb-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register here
          </Link>
        </p>
        <p className="mb-0">
          <Link to="/reset-password" className="text-decoration-none">
            Forgot your password?
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
