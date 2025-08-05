import React, { useState } from "react";
import { TableContainer } from "../../components/dynamicTable";

const Templates = () => {
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
    }
  ]);

  return (
    <div className="container py-4">
      <TableContainer
        columns={columns}
        data={data}
        multiSelect={false}
        detailsRoute="/templates"
      />
    </div>
  );
};

export default Templates;
