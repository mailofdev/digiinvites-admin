import React from "react";

const Settings = () => (
  <div className="container py-4">
    <h2 className="fw-bold mb-4">Settings</h2>
    <form>
      {/* General Settings */}
      <div className="card mb-4">
        <div className="card-header">General Settings</div>
        <div className="card-body row g-3">
          <div className="col-md-4">
            <label className="form-label">Site Name</label>
            <input className="form-control" placeholder="Enter site name" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Brand Logo</label>
            <input type="file" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Theme Mode</label>
            <select className="form-select">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        </div>
      </div>
      {/* Email Settings */}
      <div className="card mb-4">
        <div className="card-header">Email Settings</div>
        <div className="card-body row g-3">
          <div className="col-md-4">
            <label className="form-label">SMTP Server</label>
            <input className="form-control" placeholder="smtp.example.com" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Sender Name</label>
            <input className="form-control" placeholder="Your Name" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Email Template</label>
            <select className="form-select">
              <option>Default</option>
              <option>Custom</option>
            </select>
          </div>
        </div>
      </div>
      {/* Feature Toggles */}
      <div className="card mb-4">
        <div className="card-header">Feature Toggles</div>
        <div className="card-body row g-3">
          <div className="col-md-3">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="rsvpToggle" />
              <label className="form-check-label" htmlFor="rsvpToggle">Enable RSVP</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="publicViewToggle" />
              <label className="form-check-label" htmlFor="publicViewToggle">Enable Public Viewing</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="expirationToggle" />
              <label className="form-check-label" htmlFor="expirationToggle">Enable Expiration Timers</label>
            </div>
          </div>
        </div>
      </div>
      {/* Domain Settings */}
      <div className="card mb-4">
        <div className="card-header">Domain Settings</div>
        <div className="card-body row g-3">
          <div className="col-md-6">
            <label className="form-label">Custom Domain</label>
            <input className="form-control" placeholder="yourdomain.com" />
          </div>
        </div>
      </div>
      {/* Save/Reset Buttons */}
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="reset" className="btn btn-outline-secondary">Reset</button>
      </div>
    </form>
  </div>
);

export default Settings; 