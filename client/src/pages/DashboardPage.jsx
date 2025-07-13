import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { LogOut, FileEdit, Trash2, Folder, FilePlus } from 'lucide-react';
import { Button, Card, Form } from 'react-bootstrap'; // Import Bootstrap components

const DashboardPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [folderStack, setFolderStack] = useState([{
    id: 'root',
    name: 'My Drive'
  }]);
  const currentFolder = folderStack[folderStack.length - 1];

  const fetchFiles = async (folderId, query) => {
    setLoading(true);
    try {
      const response = await api.get(`/files?folderId=${folderId}&searchQuery=${query}`);
      setFiles(response.data);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Failed to load files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchFiles(currentFolder.id, searchQuery);
    }, 500); // Debounce for 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [currentFolder, searchQuery]);

  const handleCreateNewFile = () => {
    navigate(`/editor`);
  };

  const handleEditFile = (fileId) => {
    navigate(`/editor/${fileId}`);
  };

  const handleDeleteFile = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await api.delete(`/files/${fileId}`);
      alert('Item deleted successfully!');
      fetchFiles(currentFolder.id, searchQuery);
    } catch (err) {
      console.error('Error deleting file:', err);
      alert('Failed to delete item. Please check console for details.');
    }
  };

  const handleFolderClick = (folder) => {
    setFolderStack([...folderStack, folder]);
    setSearchQuery(''); // Clear search when changing folders
  };

  const handleGoBack = () => {
    if (folderStack.length > 1) {
      const newStack = [...folderStack];
      newStack.pop();
      setFolderStack(newStack);
      setSearchQuery(''); // Clear search when going back
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    // Clear access token from URL (if present) and redirect to login page
    navigate('/');
  };

  if (loading) {
    return <div className="container mt-5"><p>Loading files...</p></div>;
  }

  if (error) {
    return <div className="container mt-5"><p className="text-danger">Error: {error}</p></div>;
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Dashboard</h1>
        <div className="d-flex align-items-center gap-3">
          <span className="fw-bold">User: Roti Rome</span>
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut className="me-2" size={16} /> Logout
          </Button>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="primary" onClick={handleCreateNewFile}>
          <FilePlus className="me-2" size={16} /> Create New File
        </Button>
        <Form.Control
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-grow-1"
        />
      </div>

      <h2 className="h4 mb-3">{currentFolder.name}</h2>
      {folderStack.length > 1 && (
        <Button variant="outline-secondary" onClick={handleGoBack} className="mb-3">
          Back
        </Button>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
        {files.length === 0 ? (
          <p className="col">No files found.</p>
        ) : (
          files.map((file) => (
            <div key={file.id} className="col">
              <Card className="h-100">
                <Card.Body className="d-flex align-items-center justify-content-between p-2">
                  <div
                    className="d-flex align-items-center flex-grow-1 text-truncate"
                    style={{ cursor: file.mimeType === 'application/vnd.google-apps.folder' ? 'pointer' : 'default' }}
                    onClick={() => file.mimeType === 'application/vnd.google-apps.folder' && handleFolderClick(file)}
                  >
                    {file.mimeType === 'application/vnd.google-apps.folder' ? (
                      <Folder className="text-primary me-2 flex-shrink-0" size={20} />
                    ) : (
                      <FilePlus className="text-secondary me-2 flex-shrink-0" size={20} />
                    )}
                    <span className="text-truncate">
                      {file.name}
                    </span>
                  </div>
                  <div className="d-flex gap-1">
                    {file.mimeType !== 'application/vnd.google-apps.folder' && (
                      <Button variant="outline-secondary" size="sm" onClick={(e) => { e.stopPropagation(); handleEditFile(file.id); }}>
                        <FileEdit size={16} />
                      </Button>
                    )}
                    <Button variant="outline-danger" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteFile(file.id); }}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;