import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, TrendingUp, Radar, ChartScatter, Activity, Layers } from 'lucide-react';

const ChartSelector = ({ onSelect, selectedType }) => {
  const chartTypes = [
    { id: 'bar', name: 'Bar Chart', icon: BarChart3, description: 'Compare categories' },
    { id: 'line', name: 'Line Chart', icon: LineChart, description: 'Show trends over time' },
    { id: 'pie', name: 'Pie Chart', icon: PieChart, description: 'Show proportions' },
    { id: 'doughnut', name: 'Doughnut Chart', icon: PieChart, description: 'Proportions with center space' },
    { id: 'radar', name: 'Radar Chart', icon: Radar, description: 'Multi-dimensional data' },
    { id: 'scatter', name: 'Scatter Plot', icon: ChartScatter, description: 'Correlation analysis' },
    { id: 'bubble', name: 'Bubble Chart', icon: Activity, description: 'Three-dimensional data' },
    { id: 'mixed', name: 'Mixed Chart', icon: Layers, description: 'Combine multiple types' },
    { id: 'polarArea', name: 'Polar Area', icon: TrendingUp, description: 'Circular data visualization' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Chart Type</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chartTypes.map((chart) => (
          <button
            key={chart.id}
            onClick={() => onSelect(chart.id)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200 text-left
              ${selectedType === chart.id 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg' 
                : 'border-gray-200 dark:border-gray-700 hover:border-green-300 hover:shadow-md'
              }
            `}
          >
            <div className="flex items-center space-x-3 mb-2">
              <chart.icon className={`w-6 h-6 ${
                selectedType === chart.id ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'
              }`} />
              <h4 className="font-medium text-gray-900 dark:text-white">{chart.name}</h4>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{chart.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChartSelector;
