import React from 'react';

const Step2UploadTemplate = ({ data, onNext, onBack, onChange }) => {
  return (
    <div>
      <h4>Step 2: Upload Template</h4>
      <textarea
        className="form-control mb-3"
        rows="5"
        placeholder="Paste HTML with {{placeholders}}"
        value={data.code || ''}
        onChange={(e) => onChange({ ...data, code: e.target.value })}
      />
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button className="btn btn-primary" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};
export default Step2UploadTemplate;