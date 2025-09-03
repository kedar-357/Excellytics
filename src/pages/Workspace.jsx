
import React, { useState } from 'react';
import WorkspaceSidebar from '../components/Workspace/WorkspaceSidebar';
import WorkspaceToolbar from '../components/Workspace/WorkspaceToolbar';
import WorkspaceCanvas from '../components/Workspace/WorkspaceCanvas';
import { Menu } from 'lucide-react';

const Workspace = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'Sales_Data.xlsx',
      sheets: [
        { 
          id: 'sheet1', 
          name: 'Q1 Sales', 
          tables: ['Sales Summary', 'Regional Data'],
          data: [
            { Product: 'Laptop', Region: 'North', Sales: 15000, Quantity: 25 },
            { Product: 'Desktop', Region: 'South', Sales: 12000, Quantity: 20 },
            { Product: 'Tablet', Region: 'East', Sales: 8000, Quantity: 40 },
            { Product: 'Phone', Region: 'West', Sales: 20000, Quantity: 100 },
            { Product: 'Monitor', Region: 'North', Sales: 5000, Quantity: 30 }
          ]
        },
        { 
          id: 'sheet2', 
          name: 'Q2 Sales', 
          tables: ['Monthly Reports', 'Product Analysis'],
          data: [
            { Month: 'April', Revenue: 45000, Expenses: 20000, Profit: 25000 },
            { Month: 'May', Revenue: 52000, Expenses: 22000, Profit: 30000 },
            { Month: 'June', Revenue: 48000, Expenses: 21000, Profit: 27000 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Marketing_Analytics.xlsx',
      sheets: [
        { 
          id: 'sheet3', 
          name: 'Campaign Data', 
          tables: ['Social Media', 'Email Marketing'],
          data: [
            { Campaign: 'Facebook Ads', Impressions: 50000, Clicks: 2500, Conversions: 125 },
            { Campaign: 'Google Ads', Impressions: 75000, Clicks: 3750, Conversions: 200 },
            { Campaign: 'Instagram', Impressions: 30000, Clicks: 1800, Conversions: 90 }
          ]
        },
        { 
          id: 'sheet4', 
          name: 'ROI Analysis', 
          tables: ['Budget Allocation', 'Performance Metrics'],
          data: [
            { Channel: 'Social Media', Budget: 10000, Spend: 8500, ROI: 2.5 },
            { Channel: 'Search Ads', Budget: 15000, Spend: 14200, ROI: 3.2 },
            { Channel: 'Email', Budget: 5000, Spend: 4800, ROI: 4.1 }
          ]
        }
      ]
    }
  ]);
  const [canvasItems, setCanvasItems] = useState([]);
  const [gridBackground, setGridBackground] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileUpload = (file) => {
    // Mock file upload functionality
    const newFile = {
      id: Date.now(),
      name: file.name,
      sheets: [
        { 
          id: `sheet${Date.now()}`, 
          name: 'Sheet1', 
          tables: ['Table1', 'Table2'],
          data: [
            { Column1: 'Sample', Column2: 'Data', Column3: 100 },
            { Column1: 'Example', Column2: 'Values', Column3: 200 }
          ]
        }
      ]
    };
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  const handleSheetSelect = (sheet) => {
    setSelectedSheet(sheet);
    setTableData(sheet.data || null);
  };

  const handleTableDataChange = (newData) => {
    setTableData(newData);
    // Update the data in the uploaded files as well
    setUploadedFiles(prev => 
      prev.map(file => ({
        ...file,
        sheets: file.sheets.map(sheet => 
          sheet.id === selectedSheet.id 
            ? { ...sheet, data: newData }
            : sheet
        )
      }))
    );
  };

  const addChart = (type) => {
    const newChart = {
      id: Date.now(),
      type,
      x: Math.random() * 400,
      y: Math.random() * 300,
      width: 300,
      height: 200,
      data: generateDummyData(type)
    };
    setCanvasItems([...canvasItems, newChart]);
  };

  const generateDummyData = (type) => {
    switch (type) {
      case 'bar':
        return [
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 500 },
          { name: 'Apr', value: 280 }
        ];
      case 'line':
        return [
          { name: 'Week 1', value: 100 },
          { name: 'Week 2', value: 150 },
          { name: 'Week 3', value: 120 },
          { name: 'Week 4', value: 200 }
        ];
      case 'pie':
        return [
          { name: 'Desktop', value: 45 },
          { name: 'Mobile', value: 35 },
          { name: 'Tablet', value: 20 }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="ml-3 text-xl font-semibold text-gray-900">Analytics Workspace</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <WorkspaceSidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          uploadedFiles={uploadedFiles}
          selectedSheet={selectedSheet}
          onSheetSelect={handleSheetSelect}
          onFileUpload={handleFileUpload}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <WorkspaceToolbar
            onAddChart={addChart}
            onFileUpload={handleFileUpload}
            gridBackground={gridBackground}
            onToggleGrid={() => setGridBackground(!gridBackground)}
          />

          {/* Canvas */}
          <WorkspaceCanvas
            items={canvasItems}
            setItems={setCanvasItems}
            gridBackground={gridBackground}
            selectedSheet={selectedSheet}
            tableData={tableData}
            onTableDataChange={handleTableDataChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
