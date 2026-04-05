import React from "react";

export type Column<T> = {
  header: string;
  field: keyof T;
  className?: string;
  headerClassName?: string;
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey?: keyof T;
  emptyMessage?: string;
  search?: string;
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data = [],
  rowKey,
  emptyMessage = "No hay datos",
  search = "",
}: DataTableProps<T>) {
  const filteredData = data.filter((row) => {
    if (!search) return true;

    return columns.some((col) => {
      const value = row[col.field];

      if (value == null) return false;

      return String(value).toLowerCase().includes(search.toLowerCase());
    });
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mt-3 overflow-x-auto">
      <table className="w-full">
        {/* HEADER */}
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                  col.headerClassName ?? ""
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-100">
          {filteredData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          )}

          {filteredData.map((row, rowIndex) => (
            <tr
              key={rowKey ? String(row[rowKey]) : rowIndex}
              className="hover:bg-gray-50 transition-colors"
            >
              {columns.map((col, colIndex) => {
                const value = row[col.field];

                return (
                  <td
                    key={colIndex}
                    className={`px-4 py-4 ${col.className ?? ""}`}
                  >
                    {col.render
                      ? col.render(value, row, rowIndex)
                      : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
