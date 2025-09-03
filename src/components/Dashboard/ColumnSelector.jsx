
import React from 'react';
import { Database, TrendingUp } from 'lucide-react';

const ColumnSelector = ({ columns, xAxis, yAxis, bubbleSize, chartType, onXAxisChange, onYAxisChange, onBubbleSizeChange }) => {
  if (!columns || columns.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configure Chart Axes</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* X-Axis Selection */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <label className="font-medium text-gray-900 dark:text-white">X-Axis (Categories)</label>
          </div>
          <select
            value={xAxis || ''}
            onChange={(e) => onXAxisChange(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select X-Axis column</option>
            {columns.map((column) => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
        </div>

        {/* Y-Axis Selection */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <label className="font-medium text-gray-900 dark:text-white">Y-Axis (Values)</label>
          </div>
          <select
            value={yAxis || ''}
            onChange={(e) => onYAxisChange(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select Y-Axis column</option>
            {columns.map((column) => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Bubble Size Selection (only for bubble chart) */}
      {chartType === 'bubble' && (
        <div className="mt-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <label className="font-medium text-gray-900 dark:text-white">Bubble Size</label>
          </div>
          <select
            value={bubbleSize || ''}
            onChange={(e) => onBubbleSizeChange(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select Bubble Size column</option>
            {columns.map((column) => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
        </div>
      )}
      {/* Data Preview */}
      {xAxis && yAxis && (chartType !== 'bubble' || bubbleSize) && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Selection Preview</h4>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p><strong>X-Axis:</strong> {xAxis}</p>
            <p><strong>Y-Axis:</strong> {yAxis}</p>
            {chartType === 'bubble' && <p><strong>Bubble Size:</strong> {bubbleSize}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnSelector;
