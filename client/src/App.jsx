import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';
import { supabase } from './lib/supabaseClient';
import api from './services/api'; // Import the api instance

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // A reliable check to see if the current session is from a Google login
  // by checking that the provider_token exists and does NOT start with 'gho_'.
  const isGoogleSession = (currentSession) => {
    return currentSession?.provider_token && !currentSession.provider_token.startsWith('gho_');
  };

  const fetchFiles = useCallback(async (folderId, searchQuery) => {
    // Ultimate gatekeeper: Only proceed if we have a valid Google session.
    if (!isGoogleSession(session)) {
      console.warn("fetchFiles blocked: Not a valid Google session.");
      return []; 
    }

    try {
      const response = await api.get(`/files?folderId=${folderId}&searchQuery=${searchQuery}`);
      return response.data; // Return data for DashboardPage to handle
    } catch (err) {
      console.error('Error fetching files:', err);
      throw new Error('Failed to load files. Please try again.');
    }
  }, [session]);

  useEffect(() => {
    const handleAuthStateChange = (newSession) => {
      setSession(newSession);

      if (newSession) {
        // Set the Supabase Authorization header for all future axios requests
        api.defaults.headers.common['Authorization'] = `Bearer ${newSession.access_token}`;

        // Use the reliable check to set or delete the Google token.
        if (isGoogleSession(newSession)) {
          console.log("This is a Google login. Setting Google Access Token header.");
          api.defaults.headers.common['X-Google-Access-Token'] = newSession.provider_token;
        } else {
          console.log("This is NOT a Google login. Deleting Google Access Token header.");
          delete api.defaults.headers.common['X-Google-Access-Token'];
        }
      } else {
        // Clear all Authorization headers if no session
        console.log("No session. Clearing all auth headers.");
        delete api.defaults.headers.common['Authorization'];
        delete api.defaults.headers.common['X-Google-Access-Token'];
      }
      setLoading(false);
    };

    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleAuthStateChange(session);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthStateChange(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={!session ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            session ? (
              <DashboardPage
                session={session}
                // Use the reliable check to decide whether to pass the fetch function
                fetchGoogleDriveFiles={isGoogleSession(session) ? fetchFiles : null}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/editor" element={session ? <EditorPage /> : <Navigate to="/" />} />
        <Route path="/editor/:fileId" element={session ? <EditorPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;