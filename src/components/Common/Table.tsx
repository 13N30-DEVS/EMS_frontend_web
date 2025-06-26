import React from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  readonly columns: readonly Column<T>[];
  readonly data: readonly T[];
  readonly onRowClick?: (row: T) => void;
}

function Table<T extends { id: React.Key }>({ columns, data, onRowClick }: TableProps<T>) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.accessor)} style={{ border: '1px solid #ddd', padding: 8, background: '#f5f5f5' }}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr
            key={row.id}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            style={onRowClick ? { cursor: 'pointer' } : {}}
          >
            {columns.map(col => (
              <td key={String(col.accessor)} style={{ border: '1px solid #ddd', padding: 8 }}>
                {col.render ? col.render(row[col.accessor], row) : row[col.accessor] as any as React.ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table; 