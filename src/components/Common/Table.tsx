import React from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

function Table<T extends object>({ columns, data, onRowClick }: TableProps<T>) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} style={{ border: '1px solid #ddd', padding: 8, background: '#f5f5f5' }}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <tr
            key={rowIdx}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            style={onRowClick ? { cursor: 'pointer' } : {}}
          >
            {columns.map((col, colIdx) => (
              <td key={colIdx} style={{ border: '1px solid #ddd', padding: 8 }}>
                {col.render ? col.render(row[col.accessor], row) : row[col.accessor] as React.ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table; 