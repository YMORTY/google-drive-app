# Integrating Shadcn UI into the Dashboard

This document outlines the steps to integrate Shadcn UI components into the `DashboardPage.jsx` file, mimicking the layout and component usage found in `a.jsx`.

## Phase 1: Shadcn UI Setup

### Step 1: Install Shadcn UI CLI (Global)

This command installs the Shadcn UI command-line interface globally, which is used to initialize Shadcn UI in your project and add components.

```bash
npm install -g shadcn-ui@latest
```

### Step 2: Initialize Shadcn UI in your project

Navigate to your client directory (`google-drive-app/client`) and run the initialization command. This will create a `components.json` file and modify your `tailwind.config.js` to configure Shadcn UI. You will be prompted to answer a few questions regarding your project setup (e.g., base color, where components should live).

```bash
npx shadcn-ui@latest init
```

### Step 3: Install Required Dependencies

Shadcn UI components often rely on a few common utility packages. Install these in your client directory:

```bash
npm install class-variance-authority clsx tailwind-merge tailwindcss-animate
```

## Phase 2: Add Shadcn UI Components

After initialization, you can add individual components. Navigate to your client directory (`google-drive-app/client`) and run the following commands to add the `button`, `card`, and `input` components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
```

## Phase 3: Refactor `DashboardPage.jsx`

Once the components are added to your project (typically under `src/components/ui`), you can refactor `DashboardPage.jsx`:

1.  **Update Imports:**
    *   Remove existing imports for `Button`, `Card`, `Input` if you have any custom ones.
    *   Add imports for the Shadcn UI components at the top of `DashboardPage.jsx`:
        ```jsx
        import { Button } from "@/components/ui/button";
        import { Card, CardContent } from "@/components/ui/card";
        import { Input } from "@/components/ui/input";
        ```
        *(Note: The exact path might vary based on your `components.json` configuration during `npx shadcn-ui@latest init`)*

2.  **Replace HTML Elements with Shadcn UI Components:**
    *   **Logout Button:** Replace the existing logout `<button>` with `<Button>` and apply appropriate `variant` (e.g., `variant="default"`) and other props.
    *   **Create New File Button:** Replace the existing create file `<button>` with `<Button>`.
    *   **Search Input:** Replace the existing `<input>` with `<Input>`.
    *   **File/Folder Items:**
        *   Wrap each file/folder item `div` with `<Card>`.
        *   Replace the inner `div` that contains the content with `<CardContent>`.
        *   Replace the edit and delete `<button>` elements with `<Button>` components, using `size="icon"` and `variant="outline"` for edit, and `variant="destructive"` for delete.

3.  **Adjust Styling:**
    *   Remove most direct Tailwind CSS classes from the elements you replace, as the Shadcn UI components come with their own styling.
    *   Use Shadcn UI component props (like `variant`, `size`, `className`) to apply custom styling or override defaults where necessary.

## Phase 4: Verification

After completing the refactoring:

1.  **Restart your development server.**
2.  **Hard refresh your browser.**
3.  **Visually inspect** the Dashboard page to ensure the new components are rendered correctly and the layout matches `a.jsx`. Check console for any errors.
