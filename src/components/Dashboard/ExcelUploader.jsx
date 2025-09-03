
import React, { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, X, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

const ExcelUploader = ({ onDataParsed, onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parseStatus, setParseStatus] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const parseExcelFile = async (file) => {
    try {
      setParseStatus('parsing');
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      if (jsonData.length === 0) {
        throw new Error('No data found in the Excel file');
      }

      const columns = Object.keys(jsonData[0]);
      setParseStatus('success');
      onDataParsed({
        data: jsonData,
        columns: columns,
        fileName: file.name,
        sheetName: sheetName
      });
    } catch (error) {
      console.error('Error parsing Excel file:', error);
      setParseStatus('error');
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const excelFile = files.find(file => 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel' ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls')
    );

    if (excelFile) {
      setUploadedFile(excelFile);
      onFileSelect(excelFile);
      parseExcelFile(excelFile);
    }
  }, [onDataParsed, onFileSelect]);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      onFileSelect(file);
      parseExcelFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setParseStatus(null);
    onDataParsed(null);
    onFileSelect(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upload Excel File</h3>
      
      {!uploadedFile ? (
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
            ${isDragging 
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Drop your Excel file here
          </h4>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            or click to browse (.xlsx, .xls files supported)
          </p>
          <label className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors cursor-pointer">
            Browse Files
            <input
              type="file"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={handleFileInput}
            />
          </label>
        </div>
      ) : (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileSpreadsheet className="w-8 h-8 text-green-600" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{uploadedFile.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {parseStatus === 'parsing' && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
              )}
              {parseStatus === 'success' && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {parseStatus === 'error' && (
                <X className="w-5 h-5 text-red-600" />
              )}
              <button
                onClick={removeFile}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          
          {parseStatus === 'error' && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                Failed to parse Excel file. Please check the file format and try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;
