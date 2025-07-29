import React, { useState, useMemo, useRef } from "react";

const validateField = (field, value, formData) => {
  if (field.required && (value === undefined || value === null || value === "" || (field.type === "checkbox" && !value))) {
    return `${field.label} is required.`;
  }
  if (field.minLength && value && value.length < field.minLength) {
    return `${field.label} must be at least ${field.minLength} characters.`;
  }
  if (field.maxLength && value && value.length > field.maxLength) {
    return `${field.label} must be at most ${field.maxLength} characters.`;
  }
  if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
    return `${field.label} is invalid.`;
  }
  if (field.type === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) {
    return `Please enter a valid email address.`;
  }
  if (field.type === "password" && value && field.confirmWith) {
    if (value !== formData[field.confirmWith]) {
      return `${field.label} does not match.`;
    }
  }
  if (field.validate && typeof field.validate === "function") {
    const customError = field.validate(value, formData);
    if (customError) return customError;
  }
  return null;
};

const validateAllFields = (schema, formData) => {
  const errors = {};
  schema.forEach(field => {
    const error = validateField(field, formData[field.name], formData);
    if (error) {
      errors[field.name] = error;
    }
  });
  return errors;
};

const DynamicForm = ({ schema = [], mode = "edit", isEditing = false, formData = {}, onChange, onSubmit, onCancel }) => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({});
  const [loading, setLoading] = useState(false);
  const firstErrorRef = useRef(null);

  const memoizedSchema = useMemo(() => schema, [schema]);
  const memoizedErrors = useMemo(() => validateAllFields(memoizedSchema, formData), [memoizedSchema, formData]);
  const isViewMode = mode === "view";

  const handleChange = (e, name, type) => {
    let value;
    if (type === "checkbox") {
      value = e.target.checked;
    } else if (type === "radio") {
      value = e.target.value;
    } else {
      value = e.target.value;
    }
    const newFormData = { ...formData, [name]: value };
    if (onChange) {
      onChange(newFormData);
    }
    const field = memoizedSchema.find(f => f.name === name);
    const error = validateField(field, value, newFormData);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = validateAllFields(memoizedSchema, formData);
    setErrors(newErrors);
    setLoading(false);
    if (Object.keys(newErrors).length > 0) {
      // Focus first error
      if (firstErrorRef.current) {
        firstErrorRef.current.focus();
      }
      return;
    }
    if (onSubmit) {
      try {
        await onSubmit(formData);
      } catch (err) {
        setErrors({ form: err.message || "An error occurred. Please try again." });
      }
    }
  };

  const togglePasswordVisibility = (name) => {
    setShowPassword(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Error summary
  const errorList = Object.values(errors).filter(Boolean);

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby={errorList.length ? "formErrorSummary" : undefined}>
      {errors.form && (
        <div className="alert alert-danger" role="alert">{errors.form}</div>
      )}
      {errorList.length > 0 && (
        <div className="alert alert-danger" id="formErrorSummary" tabIndex={-1} role="alert">
          <strong>Please fix the following errors:</strong>
          <ul className="mb-0">
            {Object.entries(errors).filter(([k, v]) => v && k !== "form").map(([k, v]) => (
              <li key={k}>{v}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="row">
        {memoizedSchema.map((field, idx) => {
          let fieldEl = null;
          const disabled = isViewMode || field.disabled;
          const hasError = errors[field.name] || memoizedErrors[field.name];
          const ref = hasError && !firstErrorRef.current ? firstErrorRef : null;
          if (field.type === "input") {
            fieldEl = (
              <input
                type="text"
                className={`form-control${hasError ? " is-invalid" : ""}`}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                disabled={disabled}
                onChange={(e) => handleChange(e, field.name, field.type)}
                ref={ref}
                aria-invalid={!!hasError}
                aria-describedby={hasError ? `${field.name}-error` : undefined}
              />
            );
          } else if (field.type === "textarea") {
            fieldEl = (
              <textarea
                className={`form-control${hasError ? " is-invalid" : ""}`}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                disabled={disabled}
                onChange={(e) => handleChange(e, field.name, field.type)}
                ref={ref}
                aria-invalid={!!hasError}
                aria-describedby={hasError ? `${field.name}-error` : undefined}
              />
            );
          } else if (field.type === "select") {
            fieldEl = (
              <select
                className={`form-select${hasError ? " is-invalid" : ""}`}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                disabled={disabled}
                onChange={(e) => handleChange(e, field.name, field.type)}
                ref={ref}
                aria-invalid={!!hasError}
                aria-describedby={hasError ? `${field.name}-error` : undefined}
              >
                <option value="">Select...</option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          } else if (field.type === "checkbox") {
            fieldEl = (
              <div className="form-check">
                <input
                  type="checkbox"
                  className={`form-check-input${hasError ? " is-invalid" : ""}`}
                  id={field.name}
                  name={field.name}
                  checked={formData[field.name] || false}
                  disabled={disabled}
                  onChange={(e) => handleChange(e, field.name, field.type)}
                  ref={ref}
                  aria-invalid={!!hasError}
                  aria-describedby={hasError ? `${field.name}-error` : undefined}
                />
                <label htmlFor={field.name} className="form-check-label">
                  {field.label}
                </label>
              </div>
            );
          } else if (field.type === "radio") {
            fieldEl = (
              <div>
                {field.options.map((option, idx) => (
                  <div className="form-check" key={idx}>
                    <input
                      type="radio"
                      className={`form-check-input${hasError ? " is-invalid" : ""}`}
                      id={`${field.name}_${option.value}`}
                      name={field.name}
                      value={option.value}
                      checked={formData[field.name] === option.value}
                      disabled={disabled}
                      onChange={(e) => handleChange(e, field.name, field.type)}
                      ref={ref}
                      aria-invalid={!!hasError}
                      aria-describedby={hasError ? `${field.name}-error` : undefined}
                    />
                    <label htmlFor={`${field.name}_${option.value}`} className="form-check-label">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            );
          } else if (field.type === "date") {
            fieldEl = (
              <input
                type="date"
                className={`form-control${hasError ? " is-invalid" : ""}`}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                disabled={disabled}
                onChange={(e) => handleChange(e, field.name, field.type)}
                ref={ref}
                aria-invalid={!!hasError}
                aria-describedby={hasError ? `${field.name}-error` : undefined}
              />
            );
          } else if (field.type === "password") {
            fieldEl = (
              <div className="input-group">
                <input
                  type={showPassword[field.name] ? "text" : "password"}
                  className={`form-control${hasError ? " is-invalid" : ""}`}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  disabled={disabled}
                  onChange={(e) => handleChange(e, field.name, field.type)}
                  ref={ref}
                  aria-invalid={!!hasError}
                  aria-describedby={hasError ? `${field.name}-error` : undefined}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  tabIndex={-1}
                  onClick={() => togglePasswordVisibility(field.name)}
                  aria-label={showPassword[field.name] ? "Hide password" : "Show password"}
                  disabled={disabled}
                >
                  <i className={`bi ${showPassword[field.name] ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            );
          } else if (field.type === "email") {
            fieldEl = (
              <input
                type="email"
                className={`form-control${hasError ? " is-invalid" : ""}`}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                disabled={disabled}
                onChange={(e) => handleChange(e, field.name, field.type)}
                ref={ref}
                aria-invalid={!!hasError}
                aria-describedby={hasError ? `${field.name}-error` : undefined}
              />
            );
          }
          return (
            <div className="mb-3 col-md-12 col-12" key={idx}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
                {field.required && <span className="text-danger ms-1">*</span>}
              </label>
              {fieldEl}
              {(hasError) && (
                <div className="invalid-feedback d-block" id={`${field.name}-error`}>
                  {errors[field.name] || memoizedErrors[field.name]}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {mode !== "view" && (
        <div className="d-flex gap-2 justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
            Submit
          </button>
        </div>
      )}
      {/* {onCancel && ( */}
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      {/* )} */}
    </form>
  );
};

export default DynamicForm; 