import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');

    if (!accessToken) {
      setError('Access token not found. Please log in again.');
      setLoading(false);
      return;
    }

    console.log(`Fetching files for folder: ${folderId}, search query: ${query}`);
    try {
      const response = await axios.get(`http://localhost:3001/api/files?accessToken=${accessToken}&folderId=${folderId}&searchQuery=${query}`);
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
  }, [currentFolder, searchQuery, location.search]); // Added location.search back to dependencies

  const handleCreateNewFile = () => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    navigate(`/editor?accessToken=${accessToken}`);
  };

  const handleEditFile = (fileId) => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    navigate(`/editor/${fileId}?accessToken=${accessToken}`);
  };

  const handleDeleteFile = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');

    if (!accessToken) {
      alert('Access token not found. Please log in again.');
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/files/${fileId}?accessToken=${accessToken}`);
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

  if (loading) {
    return <div>Loading files...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {folderStack.length > 1 && <button onClick={handleGoBack}>Back</button>}
      <button onClick={handleCreateNewFile}>Create New File</button>
      <input
        type="text"
        placeholder="Search files..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginLeft: '10px' }}
      />
      <h2>{currentFolder.name}</h2>
      {files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              {file.mimeType === 'application/vnd.google-apps.folder' ? (
                <span onClick={() => handleFolderClick(file)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  {file.name} (Folder)
                </span>
              ) : (
                <span>{file.name} (File)</span>
              )}
              <button onClick={() => handleEditFile(file.id)}>Edit</button>
              <button onClick={() => handleDeleteFile(file.id)} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;
