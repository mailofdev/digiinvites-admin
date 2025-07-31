import React from "react";

const TableRow = React.memo(({ row, columns, actions, isSelected, onRowClick, renderSelectCell, rowIdx }) => (
  <tr
    className={isSelected ? "table-active" : ""}
    style={isSelected ? { backgroundColor: "gold" } : {}}
    tabIndex={0}
    aria-selected={isSelected}
    onClick={e => onRowClick(row, rowIdx, e)}
  >
    {renderSelectCell(rowIdx)}
    {columns.map((col, cidx) => (
      <td key={cidx}>{row[col.key]}</td>
    ))}
    {actions && actions.length > 0 && (
      <td>
        {actions.map((action, aidx) => (
          <button
            key={aidx}
            className={`btn btn-sm me-1 ${action.className || "btn-outline-secondary"}`}
            onClick={e => { e.stopPropagation(); action.onClick(row, rowIdx); }}
            aria-label={action.label}
            tabIndex={0}
          >
            {action.label}
          </button>
        ))}
      </td>
    )}
  </tr>
));

export default TableRow; 