import React from "react";
import Table from "../../components/common/Table";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

const data = [
  { name: "Alice Smith", email: "alice@example.com", role: "Admin", status: "Active" },
  { name: "Bob Lee", email: "bob@example.com", role: "Host", status: "Blocked" },
  { name: "Carol Jones", email: "carol@example.com", role: "Viewer", status: "Active" },
];

const Users = () => (
  <div className="container py-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2 className="fw-bold mb-0">Users</h2>
      <button className="btn btn-primary">Add User</button>
    </div>
    {/* Search & Filter Bar */}
    <form className="row g-2 mb-4">
      <div className="col-md-4">
        <input className="form-control" placeholder="Search by Name or Email" />
      </div>
      <div className="col-md-3">
        <select className="form-select">
          <option>Role</option>
          <option>Admin</option>
          <option>Host</option>
          <option>Viewer</option>
        </select>
      </div>
      <div className="col-md-3">
        <select className="form-select">
          <option>Status</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>
      </div>
      <div className="col-md-2">
        <button type="submit" className="btn btn-outline-secondary w-100">Filter</button>
      </div>
    </form>
    {/* Table List */}
    <Table columns={columns} data={data} actions={(row) => (
      <div className="btn-group btn-group-sm" role="group">
        <button className="btn btn-outline-secondary">{row.status === "Active" ? "Block" : "Unblock"}</button>
        <button className="btn btn-outline-primary">Edit Role</button>
        <button className="btn btn-outline-danger">Delete</button>
      </div>
    )} />
    {/* Placeholder for user-specific invites/activity logs and role matrix */}
    <div className="mt-4">
      <h5>User Activity Logs & Role Matrix (Coming Soon)</h5>
      <div className="alert alert-info">Select a user to view their invites and activity logs.</div>
    </div>
  </div>
);

export default Users; 