import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DynamicForm from "../../components/forms/DynamicForm";

const TemplatesDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("add"); // add, edit, view

  const schema = [
    {
      type: "input",
      name: "templateName",
      label: "Template Name",
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    {
      type: "input",
      name: "templateDescription",
      label: "Template Description",
      minLength: 5,
      maxLength: 100,
    },
    {
      type: "select",
      name: "templateCategory",
      label: "Category",
      required: true,
      options: [
        { value: "", label: "Select..." },
        { value: "wedding", label: "Wedding" },
        { value: "birthday", label: "Birthday" },
        { value: "anniversary", label: "Anniversary" },
        { value: "other", label: "Other" },
      ],
    },
    {
      type: "select",
      name: "templateStatus",
      label: "Template Status",
      required: true,
      options: [
        { value: "", label: "Select..." },
        { value: "Published", label: "Published" },
        { value: "Unpublished", label: "Unpublished" },
      ],
    }
  ];

  useEffect(() => {
    // Determine mode from URL params or location state
    if (id === "new") {
      setMode("add");
    } else if (id) {
      setMode(location.state?.mode || "view");
      // Load Template data if editing/viewing
      if (location.state?.formData) {
        setFormData(location.state.formData);
      }
    }
  }, [id, location.state]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // Implement your API call here
      console.log("Submitting data:", data, "Mode:", mode);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to Templates list
      navigate("/templates");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/templates");
  };

  const getPageTitle = () => {
    switch (mode) {
      case "add":
        return "Add New Template";
      case "edit":
        return "Edit Template";
      case "view":
        return "View Template";
      default:
        return "Template Details";
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">{getPageTitle()}</h2>
        {/* <button 
          className="btn btn-outline-secondary" 
          onClick={handleCancel}
        >
          Back to Templates
        </button> */}
      </div>
      
      <div className="card shadow-sm">
        <div className="card-body">
          <DynamicForm
            schema={schema}
            mode={mode}
            isEditing={mode === "edit"}
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplatesDetails; 