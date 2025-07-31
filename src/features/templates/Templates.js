import React from "react";
import Table from "../../components/common/Table";

const columns = [
  { key: "thumbnail", label: "Thumbnail" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" },
];

const data = [
  { thumbnail: <img src="https://via.placeholder.com/48" alt="Elegant Wedding" width={48} height={48} />, name: "Elegant Wedding", category: "Wedding", status: "Active" },
  { thumbnail: <img src="https://via.placeholder.com/48" alt="Birthday Bash" width={48} height={48} />, name: "Birthday Bash", category: "Birthday", status: "Inactive" },
  { thumbnail: <img src="https://via.placeholder.com/48" alt="Corporate Gala" width={48} height={48} />, name: "Corporate Gala", category: "Corporate", status: "Active" },
];

const Templates = () => (
  <div className="container py-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2 className="fw-bold mb-0">Templates</h2>
      <button className="btn btn-primary">Create/Edit Template</button>
    </div>
    {/* Search & Filter Bar */}
    <form className="row g-2 mb-4">
      <div className="col-md-4">
        <input className="form-control" placeholder="Search by Name" />
      </div>
      <div className="col-md-4">
        <select className="form-select">
          <option>Category</option>
          <option>Wedding</option>
          <option>Birthday</option>
          <option>Corporate</option>
        </select>
      </div>
      <div className="col-md-2">
        <select className="form-select">
          <option>Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div className="col-md-2">
        <button type="submit" className="btn btn-outline-secondary w-100">Filter</button>
      </div>
    </form>
    {/* Table List */}
    <Table columns={columns} data={data} actions={() => (
      <div className="btn-group btn-group-sm" role="group">
        <button className="btn btn-outline-primary">Edit</button>
        <button className="btn btn-outline-danger">Delete</button>
      </div>
    )} />
  </div>
);

export default Templates; 