import React, {
  useState,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

const validateField = (field, value, formData) => {
  if (
    field.required &&
    (value === undefined ||
      value === null ||
      value === "" ||
      (field.type === "checkbox" && !value))
  ) {
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
  schema.forEach((field) => {
    const error = validateField(field, formData[field.name], formData);
    if (error) {
      errors[field.name] = error;
    }
  });
  return errors;
};

const DynamicForm = forwardRef(
  (
    {
      schema = [],
      mode = "edit",
      formData = {},
      onChange,
      onSubmit,
      onCancel,
      withButtons = true,
    },
    ref
  ) => {
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState({});
    const [loading, setLoading] = useState(false);
    const firstErrorRef = useRef(null);

    const memoizedSchema = useMemo(() => schema, [schema]);
    const memoizedErrors = useMemo(
      () => validateAllFields(memoizedSchema, formData),
      [memoizedSchema, formData]
    );
    const isViewMode = mode === "view";

    const handleChange = (e, name, type) => {
      const value = type === "checkbox" ? e.target.checked : e.target.value;
      const newFormData = { ...formData, [name]: value };
      if (onChange) onChange(newFormData);
      const field = memoizedSchema.find((f) => f.name === name);
      const error = validateField(field, value, newFormData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const newErrors = validateAllFields(memoizedSchema, formData);
      setErrors(newErrors);
      setLoading(false);
      if (Object.keys(newErrors).length > 0) {
        if (firstErrorRef.current) firstErrorRef.current.focus();
        return;
      }
      if (onSubmit) {
        try {
          await onSubmit(formData);
        } catch (err) {
          setErrors({ form: err.message || "Something went wrong." });
        }
      }
    };

    useImperativeHandle(ref, () => ({
      validateForm: () => {
        const newErrors = validateAllFields(memoizedSchema, formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      },
    }));

    const togglePasswordVisibility = (name) => {
      setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const errorList = Object.values(errors).filter(Boolean);

    return (
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-describedby={errorList.length ? "formErrorSummary" : undefined}
      >
        {errors.form && (
          <div className="alert alert-danger">{errors.form}</div>
        )}

        {errorList.length > 0 && (
          <div
            className="alert alert-danger"
            id="formErrorSummary"
            tabIndex={-1}
          >
            <strong>Fix the following errors:</strong>
            <ul className="mb-0">
              {Object.entries(errors)
                .filter(([k, v]) => v && k !== "form")
                .map(([k, v]) => (
                  <li key={k}>{v}</li>
                ))}
            </ul>
          </div>
        )}

        <div className="row">
          {memoizedSchema.map((field, idx) => {
            const hasError =
              errors[field.name] || memoizedErrors[field.name];
            const disabled = isViewMode || field.disabled;
            const inputRef =
              hasError && !firstErrorRef.current ? firstErrorRef : null;

            let fieldEl = null;
            switch (field.type) {
              case "input":
                fieldEl = (
                  <input
                    type="text"
                    className={`form-control${hasError ? " is-invalid" : ""}`}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    disabled={disabled}
                    onChange={(e) => handleChange(e, field.name, field.type)}
                    ref={inputRef}
                  />
                );
                break;
              case "textarea":
                fieldEl = (
                  <textarea
                    className={`form-control${hasError ? " is-invalid" : ""}`}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    disabled={disabled}
                    onChange={(e) => handleChange(e, field.name, field.type)}
                    ref={inputRef}
                  />
                );
                break;
              case "select":
                fieldEl = (
                  <select
                    className={`form-select${hasError ? " is-invalid" : ""}`}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    disabled={disabled}
                    onChange={(e) => handleChange(e, field.name, field.type)}
                    ref={inputRef}
                  >
                    <option value="">Select...</option>
                    {field.options.map((opt, i) => (
                      <option key={i} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                );
                break;
              case "checkbox":
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
                      ref={inputRef}
                    />
                    <label htmlFor={field.name} className="form-check-label">
                      {field.label}
                    </label>
                  </div>
                );
                break;
              case "radio":
                fieldEl = field.options.map((opt, i) => (
                  <div className="form-check" key={i}>
                    <input
                      type="radio"
                      className={`form-check-input${hasError ? " is-invalid" : ""}`}
                      id={`${field.name}_${opt.value}`}
                      name={field.name}
                      value={opt.value}
                      checked={formData[field.name] === opt.value}
                      disabled={disabled}
                      onChange={(e) => handleChange(e, field.name, field.type)}
                      ref={inputRef}
                    />
                    <label
                      htmlFor={`${field.name}_${opt.value}`}
                      className="form-check-label"
                    >
                      {opt.label}
                    </label>
                  </div>
                ));
                break;
              case "date":
                fieldEl = (
                  <input
                    type="date"
                    className={`form-control${hasError ? " is-invalid" : ""}`}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    disabled={disabled}
                    onChange={(e) => handleChange(e, field.name, field.type)}
                    ref={inputRef}
                  />
                );
                break;
              case "password":
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
                      ref={inputRef}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      tabIndex={-1}
                      onClick={() => togglePasswordVisibility(field.name)}
                      disabled={disabled}
                    >
                      <i
                        className={`bi ${
                          showPassword[field.name] ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                );
                break;
              case "email":
                fieldEl = (
                  <input
                    type="email"
                    className={`form-control${hasError ? " is-invalid" : ""}`}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    disabled={disabled}
                    onChange={(e) => handleChange(e, field.name, field.type)}
                    ref={inputRef}
                  />
                );
                break;
              default:
                break;
            }

            return (
              <div className="mb-3 col-12" key={idx}>
                {field.type !== "checkbox" && field.type !== "radio" && (
                  <label htmlFor={field.name} className="form-label">
                    {field.label}
                    {field.required && (
                      <span className="text-danger ms-1">*</span>
                    )}
                  </label>
                )}
                {fieldEl}
                {hasError && (
                  <div className="invalid-feedback d-block">
                    {errors[field.name] || memoizedErrors[field.name]}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {withButtons && (
          <div className="d-flex justify-content-end gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    );
  }
);

export default DynamicForm;
