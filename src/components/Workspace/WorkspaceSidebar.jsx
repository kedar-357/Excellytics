
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileSpreadsheet, Table, Upload, X } from 'lucide-react';

const WorkspaceSidebar = ({ 
  isOpen, 
  onToggle, 
  uploadedFiles, 
  selectedSheet, 
  onSheetSelect, 
  onFileUpload 
}) => {
  const [expandedFiles, setExpandedFiles] = useState({});
  const [dragOver, setDragOver] = useState(false);

  const toggleFileExpansion = (fileId) => {
    setExpandedFiles(prev => ({
      ...prev,
      [fileId]: !prev[fileId]
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        onFileUpload(file);
      }
    });
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => onFileUpload(file));
    e.target.value = '';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
          onClick={onToggle} 
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-30
        w-80 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${!isOpen ? 'lg:w-0 lg:overflow-hidden' : ''}
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Excel Files</h2>
          <button
            onClick={onToggle}
            className="lg:hidden p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-4 border-b border-gray-200">
          <div
            className={`
              border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
              transition-colors
              ${dragOver 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Drop Excel files here or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports .xlsx and .xls files
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {/* Files List */}
        <div className="flex-1 overflow-y-auto p-4">
          {uploadedFiles.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No Excel files uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {uploadedFiles.map(file => (
                <div key={file.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFileExpansion(file.id)}
                    className="w-full flex items-center p-3 hover:bg-gray-50 transition-colors"
                  >
                    {expandedFiles[file.id] ? (
                      <ChevronDown className="w-4 h-4 text-gray-500 mr-2" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500 mr-2" />
                    )}
                    <FileSpreadsheet className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </span>
                  </button>
                  
                  {expandedFiles[file.id] && (
                    <div className="pb-2">
                      {file.sheets.map(sheet => (
                        <div key={sheet.id} className="ml-6">
                          <button
                            onClick={() => onSheetSelect(sheet)}
                            className={`
                              w-full flex items-center p-2 rounded hover:bg-gray-50 transition-colors
                              ${selectedSheet?.id === sheet.id ? 'bg-green-50 text-green-700' : 'text-gray-700'}
                            `}
                          >
                            <Table className="w-4 h-4 mr-2" />
                            <span className="text-sm">{sheet.name}</span>
                          </button>
                          
                          {sheet.tables && (
                            <div className="ml-6 space-y-1">
                              {sheet.tables.map((table, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center p-1 text-xs text-gray-600"
                                >
                                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                  {table}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkspaceSidebar;
