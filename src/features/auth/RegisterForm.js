import React, { useState } from "react";
import DynamicForm from "../../components/forms/DynamicForm";
import { Link } from "react-router-dom";
import { registerUserAPI } from "../../../services/authAPI";

const RegisterForm = () => {
  const schema = [
    {
      type: "input",
      name: "firstName",
      label: "First Name",
      required: true,
      minLength: 3,
    },
    {
      type: "input",
      name: "lastName",
      label: "Last Name",
      required: true,
      minLength: 3,
    },
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
      minLength: 6,
      required: true,
    },
    {
      type: "input",
      name: "phoneNumber",
      label: "Phone Number",
      required: true,
    },
    {
      type: "select",
      name: "gender",
      label: "Gender",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      required: true,
    },
    {
      type: "select",
      name: "role",
      label: "Role",
      options: [
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" },
      ],
      required: true,
    },
  ];

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await registerUserAPI(data);
      alert("✅ Registration successful!");
      console.log("API response:", response);
      setFormData({});
    } catch (error) {
      console.error("❌ Registration failed:", error);
      alert("Registration failed. " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({});
  };

  return (
    <>
      <div className="card p-4">
        <DynamicForm
          schema={schema}
          mode={mode}
          isEditing={mode === "edit"}
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          actionButtonName={loading ? "Registering..." : "Register"}
          singleButtonInCenter={true}
          twoRowForm={true}
        />
        <div className="text-center mt-2">
          <p className="mb-2">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login here
            </Link>
          </p>
          <p className="mb-0">
            <Link to="/reset-password" className="text-decoration-none">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
