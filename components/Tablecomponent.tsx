import React from "react";

type Column<T> = {
  key: keyof T; // The field in the data object
  header: string; // Header label for the column
  render?: (value: T[keyof T], row: T) => React.ReactNode; // Optional custom renderer
};

type TableProps<T> = {
  columns: Column<T>[]; // Array of column definitions
  data: T[]; // Array of data rows
  className?: string; // Optional additional styles
};

const Tablecomponent = <T,>({ columns, data, className }: TableProps<T>): JSX.Element => {
  return (
    <div className={`overflow-x-auto w-full ${className || ""}`}>
      <table className="w-full border-collapse border border-gray-200 text-left">
        {/* Table Header */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-2 border-b border-gray-300 bg-gray-100 text-sm font-semibold text-gray-700"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-4 py-2 border-b border-gray-200 text-sm text-gray-600"
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tablecomponent;
