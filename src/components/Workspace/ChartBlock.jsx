
import React, { useState } from 'react';
import { MoreHorizontal, Trash2, Edit, Download, Copy } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartBlock = ({ item, onMouseDown, onDelete, onResize, isDragging }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const renderChart = () => {
    switch (item.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={item.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={item.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={item.data}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {item.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={item.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis dataKey="value" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Scatter dataKey="value" fill="#f59e0b" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div className="flex items-center justify-center h-full text-gray-500">Unknown chart type</div>;
    }
  };

  const handleMenuAction = (action) => {
    switch (action) {
      case 'edit':
        break;
      case 'duplicate':
        break;
      case 'export':
        break;
      case 'delete':
        onDelete();
        break;
    }
    setShowMenu(false);
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  return (
    <div
      className={`
        absolute bg-white rounded-lg shadow-lg border border-gray-200
        ${isDragging ? 'shadow-xl scale-105' : 'hover:shadow-xl'}
        ${isResizing ? 'resize-mode' : ''}
        transition-all duration-200
      `}
      style={{
        left: item.x,
        top: item.y,
        width: item.width,
        height: item.height,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 1
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg"
        onMouseDown={onMouseDown}
      >
        <h3 className="font-medium text-gray-900 capitalize">
          {item.type} Chart
        </h3>
        
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="py-1">
                <button
                  onClick={() => handleMenuAction('edit')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleMenuAction('duplicate')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </button>
                <button
                  onClick={() => handleMenuAction('export')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={() => handleMenuAction('delete')}
                  className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-4" style={{ height: item.height - 60 }}>
        {renderChart()}
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={handleResizeStart}
        onMouseUp={handleResizeEnd}
      >
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-400 rounded-sm"></div>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowMenu(false)} 
        />
      )}
    </div>
  );
};

export default ChartBlock;
