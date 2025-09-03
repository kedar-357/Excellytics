
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  BarChart3, 
  LineChart, 
  PieChart, 
  ChartScatter,
  Upload, 
  Download, 
  Undo, 
  Redo,
  Grid3X3,
  MoreHorizontal
} from 'lucide-react';

const WorkspaceToolbar = ({ 
  onAddChart, 
  onFileUpload, 
  gridBackground, 
  onToggleGrid 
}) => {
  const [showChartDropdown, setShowChartDropdown] = useState(false);
  const navigate = useNavigate();

  const chartTypes = [
    { type: 'bar', icon: BarChart3, label: 'Bar Chart' },
    { type: 'line', icon: LineChart, label: 'Line Chart' },
    { type: 'pie', icon: PieChart, label: 'Pie Chart' },
    { type: 'scatter', icon: ChartScatter, label: 'Scatter Plot' }
  ];

  const handleChartAdd = (type) => {
    onAddChart(type);
    setShowChartDropdown(false);
  };

  const handleFileUpload = () => {
    document.getElementById('toolbar-file-upload').click();
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => onFileUpload(file));
    e.target.value = '';
  };

  const handleExport = () => {
    // console.log('Exporting workspace...');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center space-x-2">
        {/* Back to Dashboard */}
        <button
          onClick={handleBackToDashboard}
          className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* File Upload */}
        <button
          onClick={handleFileUpload}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Upload Excel</span>
        </button>
        
        <input
          id="toolbar-file-upload"
          type="file"
          multiple
          accept=".xlsx,.xls"
          className="hidden"
          onChange={handleFileInput}
        />

        {/* Chart Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowChartDropdown(!showChartDropdown)}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Add Chart</span>
          </button>
          
          {showChartDropdown && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                {chartTypes.map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => handleChartAdd(type)}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Click outside to close */}
          {showChartDropdown && (
            <div 
              className="fixed inset-0 z-5" 
              onClick={() => setShowChartDropdown(false)} 
            />
          )}
        </div>

        {/* Export */}
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Undo/Redo */}
        <button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        
        <button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        {/* Grid Toggle */}
        <button
          onClick={onToggleGrid}
          className={`
            p-2 rounded-lg transition-colors
            ${gridBackground 
              ? 'bg-green-100 text-green-700' 
              : 'text-gray-600 hover:bg-gray-100'
            }
          `}
          title="Toggle Grid"
        >
          <Grid3X3 className="w-4 h-4" />
        </button>

        {/* More Options */}
        <button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
          title="More Options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default WorkspaceToolbar;
