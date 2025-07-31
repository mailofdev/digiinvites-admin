import React, { useState } from "react";

const steps = [
  { label: "Create Category" },
  { label: "Create Template" },
  { label: "Create Invitation" },
];

const CreateFlow = () => {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Create Flow</h2>
      {/* Stepper */}
      <div className="mb-4">
        <ul className="nav nav-pills">
          {steps.map((s, idx) => (
            <li className="nav-item" key={s.label}>
              <span className={`nav-link${idx === step ? " active" : ""}`}>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Step Content */}
      <div className="card mb-4">
        <div className="card-body">
          {step === 0 && (
            <form>
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input className="form-control" placeholder="Enter category name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Tags</label>
                <input className="form-control" placeholder="e.g. wedding, birthday" />
              </div>
            </form>
          )}
          {step === 1 && (
            <form>
              <div className="mb-3">
                <label className="form-label">Template Name</label>
                <input className="form-control" placeholder="Enter template name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Thumbnail</label>
                <input type="file" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-select">
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Corporate</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Tags</label>
                <input className="form-control" placeholder="e.g. elegant, fun" />
              </div>
            </form>
          )}
          {step === 2 && (
            <form>
              <div className="mb-3">
                <label className="form-label">Host</label>
                <input className="form-control" placeholder="Enter host name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Event Info</label>
                <textarea className="form-control" rows={2} placeholder="Event details" />
              </div>
              <div className="mb-3">
                <label className="form-label">Select Template</label>
                <select className="form-select">
                  <option>Elegant Wedding</option>
                  <option>Birthday Bash</option>
                  <option>Corporate Gala</option>
                </select>
              </div>
            </form>
          )}
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary" onClick={prev} disabled={step === 0}>Back</button>
        <button className="btn btn-primary" onClick={next} disabled={step === steps.length - 1}>Next</button>
        <button className="btn btn-outline-success ms-auto">Save Draft</button>
      </div>
    </div>
  );
};

export default CreateFlow; 