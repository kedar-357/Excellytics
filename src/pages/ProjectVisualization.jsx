
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Share, Settings } from 'lucide-react';
import ChartVisualization from '../components/ChartVisualization';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ProjectVisualization = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewData, setPreviewData] = useState([]);
  const chartRef = useRef();
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Authentication required');
          navigate('/signin');
          return;
        }

        const response = await fetch(`https://excel-backend-oil4.onrender.com/api/projects/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Project not found');
        }

        const projectData = await response.json();
        setProject(projectData);

        // Fetch preview data (first 5 rows)
        const previewRes = await fetch(`https://excel-backend-oil4.onrender.com/api/projects/${projectId}/preview`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (previewRes.ok) {
          const previewJson = await previewRes.json();
          setPreviewData(previewJson.preview || []);
        } else {
          setPreviewData([]);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, navigate]);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleExport = async (type) => {
    setExportMenuOpen(false);
    if (!chartRef.current) return;
    const chartNode = chartRef.current;
    const canvas = await html2canvas(chartNode, { backgroundColor: '#fff', useCORS: true });
    if (type === 'jpg') {
      const link = document.createElement('a');
      link.download = `${project.projectName || 'chart'}.jpg`;
      link.href = canvas.toDataURL('image/jpeg');
      link.click();
      toast.success('Chart exported as JPG!');
    } else if (type === 'pdf') {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      // Scale image to fit page
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      const pdfWidth = imgWidth * ratio;
      const pdfHeight = imgHeight * ratio;
      const x = (pageWidth - pdfWidth) / 2;
      const y = (pageHeight - pdfHeight) / 2;
      pdf.addImage(imgData, 'JPEG', x, y, pdfWidth, pdfHeight);
      pdf.save(`${project.projectName || 'chart'}.pdf`);
      toast.success('Chart exported as PDF!');
    }
  };

  const renderChart = () => {
    if (!project || !project.data) {
      return (
        <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">No data available</p>
        </div>
      );
    }

    return (
      <ChartVisualization
        data={project.data}
        chartType={project.chartType}
        title={project.projectName}
        chartConfig={project.chartConfig}
        ref={chartRef}
      />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Project not found</h2>
          <button
            onClick={handleBackToDashboard}
            className="text-green-600 hover:text-green-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{project.projectName}</h1>
                <p className="text-sm text-gray-500">
                  {project.chartType} chart • {project.originalFileName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setExportMenuOpen((v) => !v)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                {exportMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleExport('jpg')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Export as JPG
                    </button>
                    <button
                      onClick={() => handleExport('pdf')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Export as PDF
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => toast.success('Chart shared successfully!')}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button
                onClick={() => toast.info('Settings coming soon!')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chart Visualization */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Data Visualization</h2>
                <p className="text-sm text-gray-600">
                  {project.data?.length || 0} data points • Created {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div ref={chartRef}>
                {renderChart()}
              </div>
            </div>
          </div>

          {/* Data Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Chart Type</p>
                  <p className="font-medium capitalize">{project.chartType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">X-Axis</p>
                  <p className="font-medium">{project.xAxis}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Y-Axis</p>
                  <p className="font-medium">{project.yAxis}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data Points</p>
                  <p className="font-medium">{project.data?.length || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Source File</p>
                  <p className="font-medium text-sm">{project.fileName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Data Preview Section (full width, below grid) */}
        {previewData && previewData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Preview</h3>
            <div className="max-h-64 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(previewData[0]).map((header) => (
                      <th key={header} className="px-2 py-1 text-left font-medium text-gray-700">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      {Object.values(row).map((cell, i) => (
                        <td key={i} className="px-2 py-1 text-gray-900">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {previewData.length === 5 && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Showing first 5 rows
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProjectVisualization;
