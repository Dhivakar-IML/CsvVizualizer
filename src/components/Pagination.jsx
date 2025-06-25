import React from 'react';

function getPageNumbers(currentPage, totalPages) {
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }
  return pages;
}

const Pagination = ({ totalRows, rowsPerPage, currentPage, setCurrentPage, setRowsPerPage }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="w-full max-w-full flex flex-col sm:flex-row items-center justify-between gap-2 my-4 px-2">
      <div className="flex items-center gap-2">
        <label className="text-sm">Rows per page:</label>
        <select
          value={rowsPerPage}
          onChange={e => setRowsPerPage(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {[10, 25, 50].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-1 justify-center">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 border rounded disabled:opacity-50 bg-white hover:bg-gray-100 transition-colors"
        >
          Prev
        </button>
        {pageNumbers.map((num, idx) =>
          num === '...'
            ? <span key={idx} className="px-2 text-gray-400 select-none">...</span>
            : <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-2 py-1 border rounded ${num === currentPage ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'} transition-colors`}
              >
                {num}
              </button>
        )}
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-2 py-1 border rounded disabled:opacity-50 bg-white hover:bg-gray-100 transition-colors"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
