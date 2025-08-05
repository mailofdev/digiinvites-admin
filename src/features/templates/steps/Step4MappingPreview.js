import React from 'react';

const Step4MappingPreview = ({ data, onNext, onBack, onChange }) => {
  const handleMappingChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <h4>Step 4: Mapping & Preview</h4>
      <textarea
        className="form-control mb-3"
        rows="5"
        placeholder="HTML with {{placeholders}}"
        value={data.mapping}
        onChange={handleMappingChange}
      />
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button className="btn btn-primary" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default Step4MappingPreview;