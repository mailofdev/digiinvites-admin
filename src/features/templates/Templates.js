import React, { useState } from "react";
import { TableContainer } from "../../components/dynamicTable";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate();

  const columns = [
    { key: "title", label: "Title" },
    { key: "email", label: "Email" },
    { key: "select", label: "Select" },
    { key: "date", label: "Date" },
  ];

  const [data, setData] = useState([
    {
      id: 1,
      title: "Example 1",
      description: "Description 1",
      textarea: "Some text here...",
      select: "option1",
      checkbox: true,
      radio: "option2",
      date: "2024-06-01",
      password: "password1",
      email: "example1@email.com",
    },
  ]);

  const handleAdd = () => {
    navigate("/create-template");
  };

  const handleEdit = (row) => {
    navigate(`/templates/${row.id}`, {
      state: { mode: "edit", formData: row },
    });
  };

  const handleView = (row) => {
    navigate(`/templates/${row.id}`, {
      state: { mode: "view", formData: row },
    });
  };

  const handleDelete = (selectedIds) => {
    const confirmDelete = window.confirm("Are you sure you want to delete selected template(s)?");
    if (!confirmDelete) return;
    setData(prev => prev.filter(item => !selectedIds.includes(item.id)));
  };

  return (
    <div className="container py-4">
      <TableContainer
        columns={columns}
        data={data}
        multiSelect={false}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Templates;
