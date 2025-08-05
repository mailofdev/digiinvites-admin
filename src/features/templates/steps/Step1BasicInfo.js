import React, { useState } from "react";
import DynamicForm from "../../../components/forms/DynamicForm";

const Step1BasicInfo = ({ data, onNext, onChange, onBack }) => {
  const [localData, setLocalData] = useState(data);
  const [isValid, setIsValid] = useState(false);

  const schema = [
    {
      name: "name",
      label: "Template Name",
      type: "input",
      required: true,
      minLength: 3,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { value: "birthday", label: "Birthday" },
        { value: "wedding", label: "Wedding" },
        { value: "event", label: "Event" },
      ],
      required: true,
    },
  ];

  const handleFormChange = (formData) => {
    setLocalData(formData);
    onChange(formData);
    // Check for errors manually using your own validator
    const errors = schema.filter(field => field.required && !formData[field.name]);
    setIsValid(errors.length === 0);
  };

  return (
    <div>
      <h4>Step 1: Basic Info</h4>
      <DynamicForm
        schema={schema}
        mode="add"
        formData={localData}
        onChange={handleFormChange}
        onSubmit={onNext}
        onCancel={onBack}
      />
    </div>
  );
};

export default Step1BasicInfo;
