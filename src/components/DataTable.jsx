import React from 'react';

const DataTable = ({
  data,
  headers,
  currentPage,
  rowsPerPage,
}) => {
  if (!data || data.length === 0) return <div className="text-center py-8">No data to display.</div>;

  const startIdx = (currentPage - 1) * rowsPerPage;
  const pageData = data.slice(startIdx, startIdx + rowsPerPage);

  // Helper to render cell with ; split into new lines
  const renderCell = (value) => {
    if (typeof value === 'string' && value.includes(';')) {
      return value
        .split(';')
        .map((v, i) => (
          <span key={i} className="block whitespace-pre-line">{v.trim()}</span>
        ));
    }
    return value;
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full overflow-x-auto rounded-lg shadow-md border border-quaternary my-4 bg-background">
        <table className="w-full min-w-[600px] border-separate border-spacing-0 bg-background">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center font-semibold text-quaternary bg-background border-b-2 border-quaternary uppercase tracking-wide whitespace-nowrap">#</th>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-center font-semibold text-quaternary bg-background border-b-2 border-quaternary uppercase tracking-wide whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, idx) => (
              <tr
                key={idx}
                className="transition-colors even:bg-white odd:bg-background hover:bg-hoverrow"
              >
                <td className="px-6 py-3 text-center text-text align-middle border-b border-quaternary whitespace-pre-line font-semibold">{startIdx + idx + 1}</td>
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-6 py-3 text-center text-text align-middle border-b border-quaternary whitespace-pre-line"
                  >
                    {renderCell(row[header])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
