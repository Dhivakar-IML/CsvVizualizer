import React from "react";

const TableSearch = ({
  headers,
  searchField,
  setSearchField,
  searchQuery,
  setSearchQuery,
  totalRecords,
  filteredRecords,
  children
}) => {
  return (
    <div className="w-full max-w-5xl flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:gap-4 sm:justify-between">
      <div className="flex flex-row flex-wrap items-center gap-2 w-full sm:w-auto">
        {children}
        {totalRecords !== undefined && (
          <span className="text-sm text-quaternary">Total: <span className="font-semibold text-text">{totalRecords}</span></span>
        )}
        {filteredRecords !== undefined && (
          <span className="text-sm text-quaternary">Filtered: <span className="font-semibold text-text">{filteredRecords}</span></span>
        )}
      </div>
      {headers && headers.length > 0 && (
        <div className="flex flex-row flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <label className="text-sm font-medium text-quaternary">Search:</label>
          <select
            className="border border-quaternary rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text"
            value={searchField}
            onChange={e => setSearchField(e.target.value)}
          >
            {headers.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
          <input
            className="border border-quaternary rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-32 sm:w-48 text-text bg-background"
            type="text"
            placeholder="Enter search query..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default TableSearch;
