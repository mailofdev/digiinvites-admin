// auth/components/LoginForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuth } from "../../redux/slices/authSlice";
import DynamicForm from "../../components/forms/DynamicForm";
import routes from "../../components/navigation/Routes";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectAuth); // ✅ Redux state

  const schema = [
    {
      type: "email",
      name: "email",
      label: "Email",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      required: true,
    },
  ];

  const [formData, setFormData] = useState({});
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (data) => {
    setLocalError(""); // clear local error

    const resultAction = await dispatch(login({ email: data.email, password: data.password }));

    if (login.fulfilled.match(resultAction)) {
      navigate(routes?.find((r) => r.name === "Dashboard")?.href || "/dashboard");
    } else {
      setLocalError(resultAction.payload || "Login failed. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData({});
    setLocalError("");
  };

  return (
    <div className="card p-4">
      <h4 className="mb-3 text-center">Login</h4>

      {(localError || error) && (
        <div className="alert alert-danger" role="alert">
          {localError || error}
        </div>
      )}

      <DynamicForm
        schema={schema}
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        actionButtonName={loading ? "Logging in..." : "Login"}
        singleButtonInCenter={true}
        twoRowForm={false}
        loading={loading}
      />

      <div className="text-center mt-2">
        <p className="mb-2">
          Don&apos;t have an account?{" "}
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
    </div>
  );
};

export default LoginForm;
