
import React, { useState, useEffect } from 'react';
import { Search, SortAsc, SortDesc, Filter, Edit3, Save, X } from 'lucide-react';

const EditableTable = ({ data, onDataChange, onClose }) => {
  const [tableData, setTableData] = useState(data || []);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let filtered = [...tableData];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(filtered);
  }, [tableData, searchTerm, sortConfig]);

  const handleCellClick = (rowIndex, colKey, value) => {
    setEditingCell({ rowIndex, colKey });
    setEditValue(String(value));
  };

  const handleCellSave = () => {
    if (editingCell) {
      const newData = [...tableData];
      newData[editingCell.rowIndex][editingCell.colKey] = editValue;
      setTableData(newData);
      onDataChange(newData);
      setEditingCell(null);
      setEditValue('');
    }
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCellSave();
    } else if (e.key === 'Escape') {
      handleCellCancel();
    }
  };

  if (!tableData.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500">No data available to display</p>
      </div>
    );
  }

  const columns = Object.keys(tableData[0]);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">Excel Data Table</h3>
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-auto max-h-96">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column}</span>
                    {sortConfig.key === column && (
                      sortConfig.direction === 'asc' 
                        ? <SortAsc className="w-3 h-3" />
                        : <SortDesc className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column}
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:bg-blue-50 relative"
                    onClick={() => handleCellClick(rowIndex, column, row[column])}
                  >
                    {editingCell && 
                     editingCell.rowIndex === rowIndex && 
                     editingCell.colKey === column ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1 px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <button
                          onClick={handleCellSave}
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
                        >
                          <Save className="w-3 h-3" />
                        </button>
                        <button
                          onClick={handleCellCancel}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between group">
                        <span>{row[column]}</span>
                        <Edit3 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
        Showing {filteredData.length} of {tableData.length} rows
        {searchTerm && ` (filtered by "${searchTerm}")`}
      </div>
    </div>
  );
};

export default EditableTable;
