import React, { useRef } from 'react';
import Papa from 'papaparse';

const CSVUploader = ({ onData, onError }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      onError('Please upload a valid .csv file.');
      return;
    }
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          onError('CSV file is empty or malformed.');
        } else {
          onData(results.data, results.meta.fields);
        }
      },
      error: (err) => {
        onError('Error parsing CSV: ' + err.message);
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 my-0">
      <label htmlFor="csv-upload" className="block text-sm font-medium text-quaternary">
        Choose CSV File
      </label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="block w-full text-sm text-quaternary file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-background file:text-quaternary hover:file:bg-hoverrow cursor-pointer"
      />
    </div>
  );
};

export default CSVUploader;
