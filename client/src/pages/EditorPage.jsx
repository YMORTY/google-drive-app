import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditorPage = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNewFile, setIsNewFile] = useState(!fileId);

  useEffect(() => {
    if (!isNewFile) {
      const fetchFileContent = async () => {
        try {
          const response = await api.get(`/files/${fileId}`);
          setFileContent(response.data);
          // For existing files, we might not have the name easily, or it's part of the dashboard list.
          // For now, we'll just display content.
        } catch (err) {
          console.error('Error fetching file content:', err);
          setError('Failed to load file content.');
        } finally {
          setLoading(false);
        }
      };
      fetchFileContent();
    } else {
      setLoading(false);
    }
  }, [fileId, isNewFile]);

  const handleSave = async () => {
    if (isNewFile && !fileName.trim()) {
      alert('Please enter a file name.');
      return;
    }

    try {
      if (isNewFile) {
        await api.post(`/files`, {
          fileName: fileName.trim(),
          fileContent: fileContent,
        });
        alert('File created successfully!');
      } else {
        await api.put(`/files/${fileId}`, {
          fileContent: fileContent,
        });
        alert('File updated successfully!');
      }
      navigate(`/dashboard`); // Go back to dashboard after saving
    } catch (err) {
      console.error('Error saving file:', err);
      alert('Failed to save file. Please check console for details.');
    }
  };

  const handleCancel = () => {
    navigate(`/dashboard`);
  };

  if (loading) {
    return <div>Loading editor...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{isNewFile ? 'Create New File' : 'Edit File'}</h1>
      {isNewFile && (
        <div>
          <label htmlFor="fileName">File Name:</label>
          <input
            id="fileName"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
          />
        </div>
      )}
      <textarea
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
        rows="15"
        cols="50"
      ></textarea>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</button>
    </div>
  );
};

export default EditorPage;