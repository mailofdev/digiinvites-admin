import React from 'react';

const Step3FormFields = ({ data, onNext, onBack, onChange }) => {
  const addField = () => {
    const newField = { name: '', label: '', type: 'text' };
    onChange([...data, newField]);
  };

  const updateField = (index, key, value) => {
    const updated = data.map((f, i) => i === index ? { ...f, [key]: value } : f);
    onChange(updated);
  };

  return (
    <div>
      <h4>Step 3: Form Fields</h4>
      {data.map((field, i) => (
        <div key={i} className="mb-3">
          <input
            className="form-control mb-1"
            placeholder="Field Name"
            value={field.name}
            onChange={(e) => updateField(i, 'name', e.target.value)}
          />
          <input
            className="form-control mb-1"
            placeholder="Label"
            value={field.label}
            onChange={(e) => updateField(i, 'label', e.target.value)}
          />
        </div>
      ))}
      <button className="btn btn-outline-primary me-2" onClick={addField}>+ Add Field</button>
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button className="btn btn-primary" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default Step3FormFields;