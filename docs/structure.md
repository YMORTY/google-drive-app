
  Phase 1: Backend Setup & API Endpoints


  This is the foundation that the frontend pages will use.


   * Task 1: Setup Node.js Server
       * Initialize a new Node.js project (npm init -y).
       * Install necessary packages: express, googleapis, cors, dotenv.
       * Create a basic Express server file (index.js).


   * Task 2: Configure Google Cloud & Authentication
       * Create a project in the Google Cloud Platform.
       * Enable the "Google Drive API".
       * Create OAuth 2.0 credentials (Client ID and Secret).
       * Define the required permission scopes (for reading, creating, updating, and deleting files).
       * Store credentials securely in a .env file.


   * Task 3: Implement Backend API Routes
       * Authentication:
           * /auth/google: Redirects the user to Google's login and consent screen.
           * /auth/google/callback: Handles the response from Google after login, exchanging the authorization code for an access token.
       * File Operations (CRUD Endpoints):
           * GET /api/files: Fetches the list of files from Google Drive.
           * GET /api/files/:fileId: Fetches the content of a single, specific file.
           * POST /api/files: Creates a new file in Google Drive.
           * PUT /api/files/:fileId: Updates the content of an existing file.
           * DELETE /api/files/:fileId: Deletes a file from Google Drive.

  ---

  Phase 2: Frontend Development (The 3 Pages)


   * Task 4: Setup React Frontend
       * Initialize a new React project using Vite (npm create vite@latest).
       * Install packages: axios (for API calls) and react-router-dom (for page navigation).
       * Set up the basic routing structure for the three pages.


   * Task 5: Build Page 1: The Login Page
       * Create a simple, clean UI.
       * Add a single "Login with Google" button.
       * This button will redirect the user to the backend's /auth/google endpoint to start the login process.
       * After a successful login, the user should be automatically redirected to the File List Page.


   * Task 6: Build Page 2: The File List Page
       * This page is the main dashboard, accessible only after logging in.
       * On page load, it will call the backend's GET /api/files endpoint to fetch and display the user's files.
       * For each file in the list, display its name and three action buttons: "View", "Edit", and "Delete".
       * Implement a "Create New File" button that navigates to the File Editor Page.
       * Hook up the "Delete" button to call the DELETE /api/files/:fileId endpoint and refresh the file list upon success.


   * Task 7: Build Page 3: The File Editor/Viewer Page
       * This is a multi-purpose page for creating, viewing, and editing.
       * Create Mode: When navigated from the "Create New File" button, it will show a blank text area and a "Save" button. Clicking "Save"
         calls the POST /api/files endpoint.
       * View Mode: When navigated from a "View" button, it will fetch the file's content using GET /api/files/:fileId and display it in a
         read-only format.
       * Edit Mode: When navigated from an "Edit" button, it will fetch the file's content and display it in an editable text area with a
         "Save" button. Clicking "Save" calls the PUT /api/files/:fileId endpoint.


here is the directory structure needed to be created. please use typeScript

    1 google-drive-app/
    2 ├── client/                   # React Frontend
    3 │   ├── public/
    4 │   │   └── favicon.ico       # Icon for the browser tab
    5 │   ├── src/
    6 │   │   ├── assets/           # Images, fonts, and other static assets
    7 │   │   ├── components/       # Reusable React components (e.g., Button, FileListItem)
    8 │   │   │   ├── FileList.jsx
    9 │   │   │   └── Navbar.jsx
   10 │   │   ├── pages/            # Components representing a full page
   11 │   │   │   ├── LoginPage.jsx
   12 │   │   │   ├── DashboardPage.jsx
   13 │   │   │   └── EditorPage.jsx
   14 │   │   ├── services/         # Functions for making API calls to the backend
   15 │   │   │   └── api.js
   16 │   │   ├── App.jsx           # Main application component with routing
   17 │   │   └── main.jsx          # The entry point for the React app
   18 │   ├── .gitignore
   19 │   ├── index.html            # The main HTML file for the React app
   20 │   ├── package.json          # Frontend dependencies and scripts
   21 │   └── vite.config.js        # Vite configuration
   22 │
   23 ├── server/                   # Node.js & Express Backend
   24 │   ├── src/
   25 │   │   ├── api/              # API route definitions
   26 │   │   │   ├── authRoutes.js
   27 │   │   │   └── fileRoutes.js
   28 │   │   ├── config/           # Configuration files (e.g., for environment variables)
   29 │   │   │   └── index.js
   30 │   │   ├── controllers/      # Logic to handle requests and send responses
   31 │   │   │   ├── authController.js
   32 │   │   │   └── fileController.js
   33 │   │   ├── middleware/       # Middleware functions (e.g., for authentication)
   34 │   │   │   └── authMiddleware.js
   35 │   │   ├── services/         # Business logic (e.g., interacting with Google Drive)
   36 │   │   │   └── googleDrive.js
   37 │   │   └── index.js          # The main entry point for the Express server
   38 │   ├── .env                  # Environment variables (API keys, secrets) - NOT committed to git
   39 │   ├── .gitignore
   40 │   └── package.json          # Backend dependencies and scripts
   41 │
   42 └── .gitignore                # Root .gitignore (e.g., to ignore server/.env)
   43 └── README.md                 # Project overview and setup instructions


  Key Points:


   * `client/`: This is a self-contained React application created by Vite. It will handle all the UI and user interactions.
   * `server/`: This is a self-contained Node.js application. Its only job is to provide a secure API for the frontend to interact with Google
     Drive.
   * Separation of Concerns: This structure ensures that your frontend code isn't mixed with your backend code, which makes the application
     much easier to develop, debug, and maintain.


  Now, I will start by creating this directory structure and initializing the npm projects in both the client and server directories.Okay,
  proceeding with the setup.


  First, I'll create the main project directory and the server and client subdirectories. Then, I'll initialize a Node.js project within the
  server directory.
