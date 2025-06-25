import React, { useState, useEffect } from 'react';
import CSVUploader from './components/CSVUploader';
import DataTable from './components/DataTable';
import Pagination from './components/Pagination';
import TableSearch from './components/TableSearch';
import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50); // Default to 50
  const [searchField, setSearchField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleData = (parsedData, parsedHeaders) => {
    setData(parsedData);
    setHeaders(parsedHeaders);
    setError('');
    setCurrentPage(1);
    setSearchField(parsedHeaders[0] || '');
    setSearchQuery('');
  };

  const handleError = (msg) => {
    setError(msg);
    setData([]);
    setHeaders([]);
    setFilteredData([]);
  };

  // Filter data based on search
  useEffect(() => {
    if (!searchField || !searchQuery) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(row =>
          String(row[searchField] || '')
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    }
    setCurrentPage(1);
  }, [data, searchField, searchQuery]);

  // Reset currentPage to 1 if rowsPerPage changes and current page is out of range
  useEffect(() => {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [rowsPerPage, filteredData.length]);

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-primary">CSV Visualizer</h1>
      <CSVUploader onData={handleData} onError={handleError} />
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {data.length > 0 && (
        <>
          <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center mb-2">
            <span className="text-sm text-quaternary">Total records: <span className="font-semibold text-textdark">{data.length}</span></span>
            <span className="text-sm text-quaternary">Filtered records: <span className="font-semibold text-textdark">{filteredData.length}</span></span>
          </div>
          <TableSearch
            headers={headers}
            searchField={searchField}
            setSearchField={setSearchField}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <DataTable data={filteredData} headers={headers} currentPage={currentPage} rowsPerPage={rowsPerPage} />
          <Pagination
            totalRows={filteredData.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
          />
        </>
      )}
    </div>
  );
}

export default App;
