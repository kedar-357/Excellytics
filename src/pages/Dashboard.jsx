import React, { useState, useEffect, useRef } from 'react';
import { Folder, BarChart3, TrendingUp, FileText, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import TopBar from '../components/Dashboard/TopBar';
import ProjectCard from '../components/Dashboard/ProjectCard';
import ProjectCreationModal from '../components/Dashboard/ProjectCreationModal';
import { toast } from 'sonner';
import ChartVisualization from '../components/ChartVisualization';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [renameModal, setRenameModal] = useState({ open: false, project: null, newName: '' });
  const [exportModal, setExportModal] = useState({ open: false, project: null });
  const [exportType, setExportType] = useState('');
  const exportChartRef = useRef();
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const response = await fetch('https://excel-backend-oil4.onrender.com/api/projects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const projectsData = await response.json();
        
        // Transform the data to match the expected format
        const transformedProjects = projectsData.map(project => ({
          id: project._id,
          name: project.projectName,
          type: 'project',
          lastModified: new Date(project.updatedAt).toLocaleDateString(),
          icon: BarChart3, // Default icon, you can map based on chartType
          chartType: project.chartType,
          fileName: project.originalFileName,
          createdAt: project.createdAt,
          folderId: project.folderId || null
        }));

        setProjects(transformedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const projectsToSave = projects.filter(p => p.type === 'project' && p.data);
    if (projectsToSave.length > 0) {
      localStorage.setItem('projects', JSON.stringify(projectsToSave));
    }
  }, [projects]);

  // Fetch folders for move-to-folder and sidebar
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://excel-backend-oil4.onrender.com/api/projects/folders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setFolders(data);
        }
      } catch (err) {}
    };
    fetchFolders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // or clear auth context/token
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleOpenProject = (project) => {
    if (project.type === 'project') {
      toast.success(`Opening ${project.name}...`);
      navigate(`/project/${project.id}`);
    } else {
      toast.info(`Opening folder: ${project.name}`);
    }
  };

  const handleProjectAction = async (action, projectNameOrFolderId) => {
    switch (action) {
      case 'rename':
        const projectToRename = projects.find(p => p.name === projectNameOrFolderId);
        if (!projectToRename) return;
        setRenameModal({ open: true, project: projectToRename, newName: projectToRename.name });
        break;
      case 'duplicate':
        const projectToDuplicate = projects.find(p => p.name === projectNameOrFolderId);
        if (projectToDuplicate) {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://excel-backend-oil4.onrender.com/api/projects/${projectToDuplicate.id}/duplicate`, {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
              toast.success(`${projectNameOrFolderId} duplicated successfully!`);
              // Refresh projects from backend
              const refreshed = await fetch('https://excel-backend-oil4.onrender.com/api/projects', {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              if (refreshed.ok) {
                const projectsData = await refreshed.json();
                const transformedProjects = projectsData.map(project => ({
                  id: project._id,
                  name: project.projectName,
                  type: 'project',
                  lastModified: new Date(project.updatedAt).toLocaleDateString(),
                  icon: BarChart3,
                  chartType: project.chartType,
                  fileName: project.originalFileName,
                  createdAt: project.createdAt,
                  folderId: project.folderId || null
                }));
                setProjects(transformedProjects);
              }
            } else {
              toast.error('Failed to duplicate project');
            }
          } catch (err) {
            toast.error('Failed to duplicate project');
          }
        }
        break;
      case 'delete':
        // Find project by name
        const projectToDelete = projects.find(p => p.name === projectNameOrFolderId);
        if (!projectToDelete) return;
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`https://excel-backend-oil4.onrender.com/api/projects/${projectToDelete.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            setProjects(projects.filter(p => p.id !== projectToDelete.id));
            toast.success(`${projectNameOrFolderId} deleted successfully!`);
          } else {
            toast.error(`Failed to delete ${projectNameOrFolderId}`);
          }
        } catch (error) {
          toast.error(`Failed to delete ${projectNameOrFolderId}`);
        }
        break;
      case 'export':
        toast.success(`Exporting ${projectNameOrFolderId}...`);
        break;
      case 'share':
        toast.success(`Sharing ${projectNameOrFolderId}...`);
        break;
      case 'move': {
        // projectNameOrFolderId is folderId
        const projectToMove = projects.find(p => p.name === renameModal.project?.name || p.name === projectNameOrFolderId || p.name === projectNameOrFolderId?.name);
        const folderId = typeof projectNameOrFolderId === 'string' ? projectNameOrFolderId : null;
        if (!projectToMove) return;
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`https://excel-backend-oil4.onrender.com/api/projects/${projectToMove.id}/move`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ folderId })
          });
          if (response.ok) {
            // Refresh projects from backend
            const refreshed = await fetch('https://excel-backend-oil4.onrender.com/api/projects', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (refreshed.ok) {
              const projectsData = await refreshed.json();
              const transformedProjects = projectsData.map(project => ({
                id: project._id,
                name: project.projectName,
                type: 'project',
                lastModified: new Date(project.updatedAt).toLocaleDateString(),
                icon: BarChart3,
                chartType: project.chartType,
                fileName: project.originalFileName,
                createdAt: project.createdAt,
                folderId: project.folderId || null
              }));
              setProjects(transformedProjects);
            }
          }
        } catch (err) {}
        break;
      }
      default:
        break;
    }
  };

  const handleProjectExport = async (project) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://excel-backend-oil4.onrender.com/api/projects/${project.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch project data');
      const fullProject = await res.json();
      setExportModal({ open: true, project: fullProject });
      setExportType('');
    } catch (err) {
      toast.error('Failed to load project data for export');
    }
  };

  const handleExportConfirm = async (type) => {
    setExportType(type);
    setTimeout(async () => {
      if (!exportChartRef.current) return;
      const chartNode = exportChartRef.current;
      const canvas = await html2canvas(chartNode, { backgroundColor: '#fff', useCORS: true });
      if (type === 'jpg') {
        const link = document.createElement('a');
        link.download = `${exportModal.project.name || 'chart'}.jpg`;
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
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        const pdfWidth = imgWidth * ratio;
        const pdfHeight = imgHeight * ratio;
        const x = (pageWidth - pdfWidth) / 2;
        const y = (pageHeight - pdfHeight) / 2;
        pdf.addImage(imgData, 'JPEG', x, y, pdfWidth, pdfHeight);
        pdf.save(`${exportModal.project.name || 'chart'}.pdf`);
        toast.success('Chart exported as PDF!');
      }
      setExportModal({ open: false, project: null });
      setExportType('');
    }, 100);
  };

  const handleRenameConfirm = async () => {
    const { project, newName } = renameModal;
    if (!project || !newName || newName.trim() === '' || newName === project.name) {
      setRenameModal({ open: false, project: null, newName: '' });
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://excel-backend-oil4.onrender.com/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectName: newName })
      });
      if (response.ok) {
        setProjects(projects.map(p => p.id === project.id ? { ...p, name: newName } : p));
        toast.success('Project renamed successfully!');
      } else {
        toast.error('Failed to rename project');
      }
    } catch (error) {
      toast.error('Failed to rename project');
    }
    setRenameModal({ open: false, project: null, newName: '' });
  };

  const handleRenameCancel = () => {
    setRenameModal({ open: false, project: null, newName: '' });
  };

  const handleProjectCreate = (projectData) => {
    // Refresh the projects list from the backend
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://excel-backend-oil4.onrender.com/api/projects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const projectsData = await response.json();
          const transformedProjects = projectsData.map(project => ({
            id: project._id,
            name: project.projectName,
            type: 'project',
            lastModified: new Date(project.updatedAt).toLocaleDateString(),
            icon: BarChart3,
            chartType: project.chartType,
            fileName: project.originalFileName,
            createdAt: project.createdAt,
            folderId: project.folderId || null
          }));
          setProjects(transformedProjects);
          navigate(`/project/${projectData.id}`);
        }
      } catch (error) {
        console.error('Error refreshing projects:', error);
      }
    };

    fetchProjects();
  };

  // Filter projects by selected folder
  const filteredProjects = selectedFolder
    ? projects.filter(p => p.folderId === selectedFolder)
    : projects;

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden transition-colors duration-200">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onCreateNew={() => setIsCreateModalOpen(true)}
        onLogout={handleLogout}
        selectedFolder={selectedFolder}
        onSelectFolder={setSelectedFolder}
        onFoldersChange={setFolders}
      />

      <div className="flex-1 flex flex-col">
        <TopBar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your analytics projects and visualizations</p>
                </div>

                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New Project
                </button>
              </div>

              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Total Projects */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {projects.filter(p => p.type === 'project').length}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                </motion.div>

                {/* Total Folders */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Folders</p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {projects.filter(p => p.type === 'folder').length}
                      </p>
                    </div>
                    <Folder className="w-8 h-8 text-blue-600" />
                  </div>
                </motion.div>

                {/* Charts */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Charts Created</p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{projects.filter(p => p.chartType).length}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </motion.div>

                {/* Data Files */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Data Files</p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{projects.filter(p => p.fileName).length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-orange-600" />
                  </div>
                </motion.div>
              </div>

              {/* Project Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                    <ProjectCard
                      project={project}
                      onOpen={() => handleOpenProject(project)}
                      onAction={(action, folderId) => handleProjectAction(action, folderId || project.name)}
                      folders={folders}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Rename Modal */}
            {renameModal.open && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rename Project</h2>
                  <input
                    type="text"
                    value={renameModal.newName}
                    onChange={e => setRenameModal({ ...renameModal, newName: e.target.value })}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && renameModal.newName.trim() && renameModal.newName !== renameModal.project?.name) {
                        handleRenameConfirm();
                      } else if (e.key === 'Escape') {
                        handleRenameCancel();
                      }
                    }}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent mb-6"
                    autoFocus
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={handleRenameCancel}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRenameConfirm}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
                      disabled={!renameModal.newName.trim() || renameModal.newName === renameModal.project?.name}
                    >
                      Rename
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Export Modal */}
            {exportModal.open && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-sm border border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Project</h2>
                  <p className="mb-6 text-gray-600 dark:text-gray-300">Choose a format to export your chart:</p>
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => handleExportConfirm('pdf')}
                      className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
                    >
                      PDF
                    </button>
                    <button
                      onClick={() => handleExportConfirm('jpg')}
                      className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                    >
                      JPG
                    </button>
                  </div>
                  <button
                    onClick={() => setExportModal({ open: false, project: null })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  {/* Hidden chart for export */}
                  <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
                    {exportModal.project && (
                      <div ref={exportChartRef} style={{ width: 600, background: '#fff', padding: 24 }}>
                        <ChartVisualization
                          data={exportModal.project.data}
                          chartType={exportModal.project.chartType}
                          title={exportModal.project.name}
                          chartConfig={exportModal.project.chartConfig}
                        />
                        {/* Data Table for PDF export */}
                        {exportType === 'pdf' && exportModal.project.data && exportModal.project.data.length > 0 && (
                          <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">Data Preview</h3>
                            <div className="max-h-64 overflow-x-auto">
                              <table className="w-full text-sm border border-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    {Object.keys(exportModal.project.data[0]).map((header) => (
                                      <th key={header} className="px-2 py-1 text-left font-medium text-gray-700 border-b border-gray-200">{header}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {exportModal.project.data.slice(0, 5).map((row, index) => (
                                    <tr key={index} className="border-t border-gray-100">
                                      {Object.values(row).map((cell, i) => (
                                        <td key={i} className="px-2 py-1 text-gray-900 border-b border-gray-100">{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              {exportModal.project.data.length > 5 && (
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                  Showing first 5 rows
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            </motion.div>
          </div>
        </main>
      </div>

      <ProjectCreationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onProjectCreate={handleProjectCreate}
      />
    </div>
  );
};

export default Dashboard;
