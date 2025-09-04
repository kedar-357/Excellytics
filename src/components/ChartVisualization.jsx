import React, { forwardRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  PieController,
  DoughnutController,
  ScatterController,
  BubbleController,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Pie, Doughnut, Scatter, Bubble } from 'react-chartjs-2';

// Register Chart.js components including controllers
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  PieController,
  DoughnutController,
  ScatterController,
  BubbleController,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartVisualization = forwardRef(({ data, chartType, title = 'Data Visualization', chartConfig }, ref) => {
  if (!data || !data.length) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  // Defensive: Supported chart types
  const supportedTypes = ['bar', 'line', 'pie', 'doughnut', 'bubble', 'scatter'];
  if (!supportedTypes.includes(chartType)) {
    console.error('Unsupported chart type:', chartType, 'Data:', data, 'Config:', chartConfig);
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 dark:bg-red-900 rounded-lg">
        <p className="text-red-600 dark:text-red-300 font-semibold">Unsupported chart type: {chartType}</p>
      </div>
    );
  }

  // Use chartConfig.xAxis and chartConfig.yAxis if available
  const xKey = chartConfig?.xAxis || Object.keys(data[0])[0];
  const yKey = chartConfig?.yAxis || Object.keys(data[0])[1];

  // Defensive: Check if keys exist in data
  if (!data[0].hasOwnProperty(xKey) || !data[0].hasOwnProperty(yKey)) {
    console.error('Chart data keys missing:', { xKey, yKey, data, chartConfig });
    return (
      <div className="flex items-center justify-center h-64 bg-red-50 dark:bg-red-900 rounded-lg">
        <p className="text-red-600 dark:text-red-300 font-semibold">Chart data is missing required fields: {xKey} or {yKey}</p>
      </div>
    );
  }

  // Color palette for pie/doughnut charts
  const colorPalette = [
    '#10B981', // green
    '#3B82F6', // blue
    '#F59E42', // orange
    '#EF4444', // red
    '#A855F7', // purple
    '#FBBF24', // yellow
    '#6366F1', // indigo
    '#14B8A6', // teal
    '#F472B6', // pink
    '#6B7280', // gray
  ];

  let backgroundColor = '#10B981';
  let borderColor = '#10B981';
  if (chartType === 'pie' || chartType === 'doughnut') {
    backgroundColor = data.map((_, i) => colorPalette[i % colorPalette.length]);
    borderColor = backgroundColor;
  }

  // For bubble and scatter charts, transform data to Chart.js format
  let chartData;
  if (chartType === 'scatter') {
    // Scatter chart: use x,y coordinates
    chartData = {
      datasets: [
        {
          label: `${yKey} vs ${xKey}`,
          data: data.map(row => ({
            x: Number(row[xKey]) || 0,
            y: Number(row[yKey]) || 0
          })),
          backgroundColor: '#10B981',
          borderColor: '#10B981',
          pointRadius: 5,
          pointHoverRadius: 7,
        }
      ]
    };
  } else if (chartType === 'bubble' && chartConfig?.bubbleSize) {
    // Try to find a categorical column for series (other than x, y, bubbleSize)
    const excludeCols = [chartConfig.xAxis, chartConfig.yAxis, chartConfig.bubbleSize];
    const possibleClassCols = Object.keys(data[0] || {}).filter(
      col => !excludeCols.includes(col)
    );
    let classCol = possibleClassCols[0];
    let datasets;
    if (classCol) {
      // Find min and max for bubble size
      const bubbleVals = data.map(row => Number(row[chartConfig.bubbleSize]) || 1);
      const minR = Math.min(...bubbleVals);
      const maxR = Math.max(...bubbleVals);
      const scaleR = val => {
        if (maxR === minR) return 15; // all same size
        return 5 + ((val - minR) / (maxR - minR)) * 25; // scale to 5-30 px
      };
      // Group data by classCol
      const classGroups = {};
      data.forEach(row => {
        const key = row[classCol] || 'Other';
        if (!classGroups[key]) classGroups[key] = [];
        classGroups[key].push({
          x: Number(row[chartConfig.xAxis]),
          y: Number(row[chartConfig.yAxis]),
          r: scaleR(Number(row[chartConfig.bubbleSize]) || 1)
        });
      });
      datasets = Object.entries(classGroups).map(([className, points], i) => ({
        label: className,
        data: points,
        backgroundColor: colorPalette[i % colorPalette.length],
        borderColor: colorPalette[i % colorPalette.length],
        borderWidth: 1,
      }));
    } else {
      // Find min and max for bubble size
      const bubbleVals = data.map(row => Number(row[chartConfig.bubbleSize]) || 1);
      const minR = Math.min(...bubbleVals);
      const maxR = Math.max(...bubbleVals);
      const scaleR = val => {
        if (maxR === minR) return 15;
        return 5 + ((val - minR) / (maxR - minR)) * 25;
      };
      // No class column, single dataset
      datasets = [
        {
          label: chartConfig.yAxis,
          data: data.map(row => ({
            x: Number(row[chartConfig.xAxis]),
            y: Number(row[chartConfig.yAxis]),
            r: scaleR(Number(row[chartConfig.bubbleSize]) || 1)
          })),
          backgroundColor: data.map((_, i) => colorPalette[i % colorPalette.length]),
          borderColor: data.map((_, i) => colorPalette[i % colorPalette.length]),
          borderWidth: 1,
        }
      ];
    }
    chartData = { datasets };
  } else {
    chartData = {
      labels: data.map(row => row[xKey]),
      datasets: [
        {
          label: yKey,
          data: data.map(row => row[yKey]),
          backgroundColor,
          borderColor,
          borderRadius: chartType === 'bar' ? 6 : 0,
          fill: chartType === 'line' ? false : true,
          tension: 0.4,
        }
      ]
    };
  }

  // Scatter chart options
  const scatterOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: title, font: { size: 20 } },
      tooltip: { enabled: true }
    },
    scales: {
      x: { 
        type: 'linear',
        position: 'bottom',
        title: { display: true, text: chartConfig?.xAxis || xKey }
      },
      y: { 
        title: { display: true, text: chartConfig?.yAxis || yKey }
      }
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart'
    }
  };

  // Bubble chart options
  const bubbleOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'right' },
      title: { display: true, text: title, font: { size: 20 } },
      tooltip: { enabled: true }
    },
    scales: {
      x: { title: { display: true, text: chartConfig?.xAxis || xKey } },
      y: { title: { display: true, text: chartConfig?.yAxis || yKey } }
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart'
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: title, font: { size: 20 } },
      tooltip: { enabled: true }
    },
    scales: {
      x: { grid: { display: false }, title: { display: true, text: xKey } },
      y: { beginAtZero: true, title: { display: true, text: yKey } }
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart'
    }
  };

  // Select appropriate options based on chart type
  const getChartOptions = () => {
    if (chartType === 'scatter') return scatterOptions;
    if (chartType === 'bubble') return bubbleOptions;
    return options;
  };

  // Render the appropriate chart component
  const renderChart = () => {
    const chartOptions = getChartOptions();
    
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={chartOptions} />;
      case 'scatter':
        return <Scatter data={chartData} options={chartOptions} />;
      case 'bubble':
        return <Bubble data={chartData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div className="w-full h-96 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm" ref={ref}>
      {renderChart()}
    </div>
  );
});

export default ChartVisualization; 
