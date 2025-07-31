import React from "react";
import PropTypes from "prop-types";

const Table = ({ columns, data, actions, footer }) => (
  <div className="table-responsive">
    <table className="table table-striped table-hover align-middle">
      <thead className="table-light">
        <tr>
          {columns.map((col) => (
            <th key={col.key || col.label} scope="col">{col.label}</th>
          ))}
          {actions && <th scope="col">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center text-muted">
              No data found.
            </td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={row.id || idx}>
              {columns.map((col) => (
                <td key={col.key || col.label}>{row[col.key]}</td>
              ))}
              {actions && (
                <td>
                  {actions(row)}
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
      {footer && <tfoot>{footer}</tfoot>}
    </table>
  </div>
);

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.func,
  footer: PropTypes.node,
};

export default Table; 