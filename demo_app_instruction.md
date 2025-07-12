## Demo Application Setup with Bootstrap

This document provides a step-by-step guide to setting up a minimal React application (`demo-app`) using Vite and Bootstrap. This setup was created to diagnose persistent CSS layout issues in the main application, confirming that the environment correctly processes and applies responsive CSS when using a different framework.

### 1. Introduction

The `demo-app` is a simple React project created with Vite. It uses Bootstrap for styling, specifically to demonstrate responsive grid layouts. The successful implementation of Bootstrap's grid confirmed that the underlying CSS processing and application mechanisms in your environment are functional, indicating that the issues in the main application were specific to Tailwind CSS integration.

### 2. Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js** (version 18 or higher recommended)
*   **npm** (Node Package Manager, usually comes with Node.js)

### 3. Setup Steps

The `demo-app` was created and configured within your project's root directory (`C:\Users\parch\projects\cursor\ideaApp\google-drive-app`).

#### 3.1. Project Creation and Initial Setup

1.  **Create the Vite React Project:**
    This command was executed from the project root to create a new Vite project named `demo-app` with a React template.
    ```bash
    npm create vite@latest demo-app -- --template react
    ```

2.  **Navigate to the Project Directory:**
    After creation, you would typically navigate into the new directory.
    ```bash
    cd demo-app
    ```

3.  **Install Initial Dependencies:**
    The initial dependencies for the Vite React project were installed.
    ```bash
    npm install
    ```

#### 3.2. Transition from Tailwind CSS (Troubleshooting Phase)

During the troubleshooting process, Tailwind CSS and its related configurations were removed from the `demo-app` to test Bootstrap.

1.  **Uninstall Tailwind CSS and Related Packages:**
    This command was used to remove Tailwind CSS, `@tailwindcss/postcss`, `postcss`, and `autoprefixer`.
    ```bash
    npm uninstall tailwindcss @tailwindcss/postcss postcss autoprefixer
    ```
    *Note: During this step, `EPERM` errors were encountered, requiring manual deletion of the `node_modules` folder in `demo-app` after ensuring all related processes (like Vite dev server) were stopped.*

2.  **Manual `node_modules` Deletion (if necessary):**
    If `EPERM` errors occurred during uninstall, the `node_modules` folder was manually deleted.
    ```bash
    # From the project root (google-drive-app)
    rmdir /s /q demo-app\node_modules
    ```

#### 3.3. Bootstrap Integration

1.  **Install Bootstrap:**
    Bootstrap was installed as a project dependency.
    ```bash
    npm install bootstrap
    ```

2.  **Update `src/index.css`:**
    The `demo-app/src/index.css` file was modified to import Bootstrap's CSS.
    ```css
    /* demo-app/src/index.css */
    @import "bootstrap/dist/css/bootstrap.min.css";

    /* Existing CSS from Vite's default template */
    :root {
      font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
      /* ... rest of the CSS ... */
    }
    /* ... rest of the file ... */
    ```

3.  **Update `src/App.jsx`:**
    The `demo-app/src/App.jsx` file was modified to use Bootstrap's responsive grid classes (`container`, `row`, `col-*-*`).
    ```jsx
    // demo-app/src/App.jsx
    import { useState } from 'react'
    import reactLogo from './assets/react.svg'
    import viteLogo from '/vite.svg'
    import './App.css' // Keep this if App.css contains specific component styles

    function App() {
      const [count, setCount] = useState(0)

      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="p-3 border bg-primary text-white">Item 1</div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="p-3 border bg-success text-white">Item 2</div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="p-3 border bg-danger text-white">Item 3</div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="p-3 border bg-warning text-white">Item 4</div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="p-3 border bg-info text-white">Item 5</div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="p-3 border bg-dark text-white">Item 6</div>
            </div>
          </div>
        </div>
      )
    }

    export default App
    ```

4.  **Remove PostCSS Configuration Files:**
    Since Bootstrap does not require PostCSS for basic usage, the `postcss.config.js` and `tailwind.config.js` files were removed from the `demo-app` directory.
    ```bash
    # From the demo-app directory
    del postcss.config.js
    del tailwind.config.js
    ```

### 4. Running the Demo Application

To run the `demo-app` and observe the Bootstrap responsive grid:

1.  **Navigate to the `demo-app` directory:**
    ```bash
    cd demo-app
    ```

2.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

3.  **Open in Browser:**
    Vite will provide a local URL (e.g., `http://localhost:5173/`). Open this URL in your web browser.

4.  **Verify Responsive Grid:**
    Observe how the "Item" boxes arrange themselves into multiple columns (e.g., 4 columns on large screens, 3 on medium, 2 on small, and 1 on extra-small) as you resize your browser window. This confirms that Bootstrap's responsive CSS is correctly applied.

