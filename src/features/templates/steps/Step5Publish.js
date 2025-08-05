import React, { useState } from 'react';
import TemplatePreview from '../TemplatePreview'; 

const Step5Publish = ({ data, onBack }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handlePublish = () => {
    console.log('Publishing Template:', data);
    alert('Template Published Successfully!');
  };

  // ✅ This creates correct sample data to pass to TemplatePreview
  const generatePreviewData = () => {
    const previewData = {};
    (data.formFields || []).forEach((field) => {
      previewData[field.name] = `${field.label} (Sample)`;
    });
    return previewData;
  };

  return (
    <div>
      <h4>Step 5: Publish</h4>
      <pre className="bg-light p-3 rounded border">{JSON.stringify(data, null, 2)}</pre>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={() => setShowPreview(true)}>View Template</button>
          <button className="btn btn-success" onClick={handlePublish}>Publish</button>
        </div>
      </div>

      {/* ✅ Correctly passes preview data */}
      {showPreview && (
        <TemplatePreview
          html={data.mapping || data.design.code}
          data={generatePreviewData()}
        />
      )}
    </div>
  );
};

export default Step5Publish;
