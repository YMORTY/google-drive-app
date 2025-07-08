import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      // Refresh the file list after deletion
      fetchFiles(); // Call fetchFiles to re-fetch the list
    } catch (err) {
      console.error('Error deleting file:', err);
      alert('Failed to delete item. Please check console for details.');
    }
  };

  const fetchFiles = async () => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');

    if (!accessToken) {
      setError('Access token not found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/files?accessToken=${accessToken}`);
      setFiles(response.data);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Failed to load files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [location.search]);

  if (loading) {
    return <div>Loading files...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleCreateNewFile}>Create New File</button>
      <h2>Your Google Drive Files:</h2>
      {files.length === 0 ? (
        <p>No files found in your Google Drive.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              {file.name} ({file.mimeType === 'application/vnd.google-apps.folder' ? 'Folder' : 'File'})
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
