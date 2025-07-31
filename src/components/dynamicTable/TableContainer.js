import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableToolbar from "./TableToolbar";
import TablePagination from "./TablePagination";

const PAGE_SIZE = 5;

const TableContainer = ({ columns = [], data = [], onRowSelect, actions = [], multiSelect = false, detailsRoute = "" }) => {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filtered and paginated data
  const filteredData = useMemo(() => {
    if (!search) return data;
    const lower = search.toLowerCase();
    return data.filter(row =>
      columns.some(col =>
        String(row[col.key] ?? "").toLowerCase().includes(lower)
      )
    );
  }, [search, data, columns]);

  const pageCount = Math.ceil(filteredData.length / PAGE_SIZE) || 1;
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, page]);

  // Selection logic
  const handleSelectRow = (idx) => {
    if (multiSelect) {
      setSelectedRows(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
    } else {
      setSelectedRow(idx);
    }
  };

  const handleRowClick = (row, idx, e) => {
    if (e && (e.target.closest("button") || e.target.closest("a") || e.target.type === "radio" || e.target.type === "checkbox")) return;
    if (!multiSelect) {
      setSelectedRow(idx);
    }
    if (onRowSelect) onRowSelect(row, idx);
  };

  const handleAddNew = () => {
    if (detailsRoute) {
      navigate(`${detailsRoute}/new`);
    }
  };

  const handleEdit = () => {
    if (multiSelect) return;
    if (selectedRow == null) return;
    const rowData = data[selectedRow];
    if (detailsRoute) {
      navigate(`${detailsRoute}/${rowData.id || selectedRow}`, {
        state: { mode: "edit", formData: rowData }
      });
    }
  };

  const handleView = () => {
    if (multiSelect) return;
    if (selectedRow == null) return;
    const rowData = data[selectedRow];
    if (detailsRoute) {
      navigate(`${detailsRoute}/${rowData.id || selectedRow}`, {
        state: { mode: "view", formData: rowData }
      });
    }
  };

  const handleDeleteTop = () => {
    // Implement delete logic as needed
  };

  const renderSelectCell = (idx) => {
    if (multiSelect) {
      return (
        <td>
          <input
            type="checkbox"
            checked={selectedRows.includes(idx)}
            onChange={() => handleSelectRow(idx)}
            aria-label="Select row"
            className="form-check-input"
          />
        </td>
      );
    } else {
      return (
        <td>
          <input
            type="radio"
            checked={selectedRow === idx}
            onChange={() => handleSelectRow(idx)}
            name="rowSelect"
            aria-label="Select row"
            className="form-check-input"
          />
        </td>
      );
    }
  };

  React.useEffect(() => {
    setPage(1);
  }, [search, data.length]);

  return (
    <div className="border-1 border-black card shadow-sm pt-2 pb-2">
      <TableToolbar
        search={search}
        setSearch={setSearch}
        handleAddNew={handleAddNew}
        handleEdit={handleEdit}
        handleView={handleView}
        handleDeleteTop={handleDeleteTop}
        multiSelect={multiSelect}
        selectedRow={selectedRow}
        selectedRows={selectedRows}
      />
      <div className="table-responsive" style={{overflowX: 'auto', width: '100%'}}>
        <table className="table table-hover table-striped align-middle" aria-labelledby="tableTitle" style={{minWidth: 700}}>
          <TableHeader columns={columns} actions={actions} multiSelect={multiSelect} />
          <tbody>
            {paginatedData.length === 0 ? (
              <tr><td colSpan={columns.length + (actions.length > 0 ? 2 : 1)} className="text-center">No data</td></tr>
            ) : (
              paginatedData.map((row, idx) => {
                const realIdx = (page - 1) * PAGE_SIZE + idx;
                const isSelected = selectedRow === realIdx || (multiSelect && selectedRows.includes(realIdx));
                return (
                  <TableRow
                    key={realIdx}
                    row={row}
                    columns={columns}
                    actions={actions}
                    isSelected={isSelected}
                    onRowClick={handleRowClick}
                    renderSelectCell={renderSelectCell}
                    rowIdx={realIdx}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2 gap-2 ms-2 me-2">
        <div className=" fs-6 fw-bold text-center w-auto me-2 ms-2 align-items-center d-flex">
          Total records: {data?.length}
        </div>
        <TablePagination page={page} setPage={setPage} pageCount={pageCount} />
      </div>
    </div>
  );
};

export default TableContainer; 