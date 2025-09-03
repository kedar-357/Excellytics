
import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExcelUploader from './ExcelUploader';
import ChartSelector from './ChartSelector';
import ColumnSelector from './ColumnSelector';
import { toast } from 'sonner';

const ProjectCreationModal = ({ isOpen, onClose, onProjectCreate }) => {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [selectedChartType, setSelectedChartType] = useState('');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [bubbleSize, setBubbleSize] = useState('');

  const totalSteps = 4;

  const resetModal = () => {
    setStep(1);
    setProjectName('');
    setSelectedFile(null);
    setParsedData(null);
    setSelectedChartType('');
    setXAxis('');
    setYAxis('');
    setBubbleSize('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreateProject = async () => {
    if (!projectName || !selectedFile || !selectedChartType || !xAxis || !yAxis || (selectedChartType === 'bubble' && !bubbleSize)) {
      toast.error('Please complete all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('projectName', projectName);
      formData.append('chartType', selectedChartType);
      formData.append('excelFile', selectedFile);
      formData.append('xAxis', xAxis);
      formData.append('yAxis', yAxis);
      if (selectedChartType === 'bubble') {
        formData.append('bubbleSize', bubbleSize);
      }

      const token = localStorage.getItem('token');
      const response = await fetch('https://excel-backend-oil4.onrender.com/api/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }

      const result = await response.json();
      
      // Call the parent callback with the new project data
      onProjectCreate({
        id: result.project.id,
        name: result.project.projectName,
        fileName: result.project.originalFileName,
        chartType: result.project.chartType,
        createdAt: result.project.createdAt
      });

      toast.success(`Project "${projectName}" created successfully!`);
      handleClose();
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error(error.message || 'Failed to create project');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return projectName.trim().length > 0;
      case 2: return parsedData !== null;
      case 3: return selectedChartType !== '';
      case 4: return xAxis && yAxis;
      default: return false;
    }
  };

  if (!isOpen) return null;

  // Handle Enter key for Next/Create
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (step < totalSteps && canProceed()) {
        e.preventDefault();
        handleNext();
      } else if (step === totalSteps && canProceed()) {
        e.preventDefault();
        handleCreateProject();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onKeyDown={handleKeyDown} tabIndex={0}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Project</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Step {step} of {totalSteps}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Details</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ExcelUploader
                  onDataParsed={setParsedData}
                  onFileSelect={setSelectedFile}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ChartSelector
                  onSelect={setSelectedChartType}
                  selectedType={selectedChartType}
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ColumnSelector
                  columns={parsedData?.columns}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  bubbleSize={bubbleSize}
                  chartType={selectedChartType}
                  onXAxisChange={setXAxis}
                  onYAxisChange={setYAxis}
                  onBubbleSizeChange={setBubbleSize}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            
            {step < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCreateProject}
                disabled={!canProceed()}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Create Project</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCreationModal;
