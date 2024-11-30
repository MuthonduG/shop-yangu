import React from "react";

export type Column<T> = {
  key: keyof T | "actions"; // Allow "actions" for custom operations
  header: string; // Column header
  render?: (value: T[keyof T] | undefined, row: T) => React.ReactNode; // Custom render logic
};

type TableProps<T> = {
  columns: Column<T>[]; // Column definitions
  data: T[]; // Table data
  className?: string; // Optional additional CSS
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
                  {col.key === "actions" // Handle the actions column separately
                    ? col.render
                      ? col.render(undefined, row)
                      : null
                    : col.render
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
