
import React, { useState } from 'react';
import { X, Folder, FileSpreadsheet, BarChart3, PieChart } from 'lucide-react';

const CreateProjectModal = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState('folder');

  const projectTypes = [
    { id: 'folder', name: 'Folder', icon: Folder, description: 'Organize your projects' },
    { id: 'excel', name: 'Excel Analysis', icon: FileSpreadsheet, description: 'Import and analyze Excel files' },
    { id: 'chart', name: 'Chart Dashboard', icon: BarChart3, description: 'Create interactive charts' },
    { id: 'report', name: 'Report', icon: PieChart, description: 'Generate analytical reports' }
  ];

  const handleCreate = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create New</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Project Types */}
        <div className="space-y-3 mb-6">
          {projectTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`
                w-full flex items-center space-x-4 p-4 rounded-lg border-2 transition-colors text-left
                ${selectedType === type.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className={`
                p-2 rounded-lg 
                ${selectedType === type.id ? 'bg-blue-100' : 'bg-gray-100'}
              `}>
                <type.icon className={`
                  w-6 h-6 
                  ${selectedType === type.id ? 'text-blue-600' : 'text-gray-600'}
                `} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{type.name}</h3>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
