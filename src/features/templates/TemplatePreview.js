import React from 'react';

const TemplatePreview = ({ html, data }) => {
  if (!html) return <div className="alert alert-warning">No template HTML provided</div>;

  const filledHtml = html.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || '');

  return (
    <div className="border p-3 mt-3 bg-light">
      <h5>Template Preview:</h5>
      <div dangerouslySetInnerHTML={{ __html: filledHtml }} />
    </div>
  );
};

export default TemplatePreview;