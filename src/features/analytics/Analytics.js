import React from "react";

const Analytics = () => (
  <div className="container py-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2 className="fw-bold mb-0">Analytics</h2>
      <button className="btn btn-outline-primary">Export as CSV/PDF</button>
    </div>
    {/* Filters */}
    <form className="row g-2 mb-4">
      <div className="col-md-3">
        <input type="date" className="form-control" placeholder="Start Date" />
      </div>
      <div className="col-md-3">
        <input type="date" className="form-control" placeholder="End Date" />
      </div>
      <div className="col-md-3">
        <select className="form-select">
          <option>Category</option>
          <option>Wedding</option>
          <option>Birthday</option>
          <option>Corporate</option>
        </select>
      </div>
      <div className="col-md-3">
        <select className="form-select">
          <option>Template</option>
          <option>Elegant Wedding</option>
          <option>Birthday Bash</option>
        </select>
      </div>
    </form>
    {/* Charts */}
    <div className="row mb-4">
      <div className="col-lg-8 mb-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title mb-3">Invitations Over Time</h5>
            <div className="bg-light border rounded d-flex align-items-center justify-content-center" style={{height: 220}}>
              <span className="text-muted">[Line/Bar Chart Placeholder]</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 mb-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title mb-3">RSVP Rates</h5>
            <div className="bg-light border rounded d-flex align-items-center justify-content-center" style={{height: 180}}>
              <span className="text-muted">[Pie Chart Placeholder]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Top Templates/Hosts/Users */}
    <div className="row">
      <div className="col-md-4 mb-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h6 className="card-title">Top Templates</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Elegant Wedding</li>
              <li className="list-group-item">Birthday Bash</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h6 className="card-title">Top Hosts</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Alice Smith</li>
              <li className="list-group-item">Bob Lee</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h6 className="card-title">Most Active Users</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Carol Jones</li>
              <li className="list-group-item">David Kim</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Analytics; 