import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LogOut, FileEdit, Trash2, Folder, FilePlus } from 'lucide-react';

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
  const [userProfile, setUserProfile] = useState(null);

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

  const fetchUserProfile = async (accessToken) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserProfile(response.data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      // Handle error, maybe redirect to login if token is invalid
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');

    if (accessToken) {
      fetchUserProfile(accessToken);
    }

    const handler = setTimeout(() => {
      fetchFiles(currentFolder.id, searchQuery);
    }, 500); // Debounce for 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [currentFolder, searchQuery, location.search]);

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

  const handleLogout = () => {
    // Clear access token from URL (if present) and redirect to login page
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen bg-blue-50 p-6">Loading files...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-blue-50 p-6">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6 test-tailwind-class">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium" style={{ fontWeight: 'bold' }}>User: Roti Rome</span>
          <button onClick={handleLogout} className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <button onClick={handleCreateNewFile} className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
          <FilePlus className="mr-2 h-4 w-4" /> Create New File
        </button>
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">{currentFolder.name}</h2>
      {folderStack.length > 1 && (
        <button onClick={handleGoBack} className="px-4 py-2 bg-gray-300 rounded-md mb-4">
          Back
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {files.length === 0 ? (
          <p>No files found.</p>
        ) : (
          files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
              <div className="flex items-center gap-3">
                {file.mimeType === 'application/vnd.google-apps.folder' ? (
                  <Folder className="text-blue-500" />
                ) : (
                  <FilePlus className="text-gray-500" />
                )}
                <span
                  className="font-medium truncate max-w-[180px]"
                  style={{ cursor: file.mimeType === 'application/vnd.google-apps.folder' ? 'pointer' : 'default', textDecoration: file.mimeType === 'application/vnd.google-apps.folder' ? 'underline' : 'none' }}
                  onClick={() => file.mimeType === 'application/vnd.google-apps.folder' && handleFolderClick(file)}
                >
                  {file.name} ({file.mimeType === 'application/vnd.google-apps.folder' ? 'Folder' : 'File'})
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditFile(file.id)} className="p-2 rounded-full hover:bg-gray-100">
                  <FileEdit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteFile(file.id)} className="p-2 rounded-full" style={{ backgroundColor: 'red' }}>
                  <Trash2 className="w-4 h-4" style={{ color: 'white' }} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;