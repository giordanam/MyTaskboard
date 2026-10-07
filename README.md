# Task Board (React)

A modern task management web application (To-Do List), originally developed in Vanilla JavaScript and completely rewritten using a declarative architecture with React and Tailwind CSS.

## Key Features

- **Full CRUD Operations:** Create, read, update, and complete tasks.
- **Dynamic Filtering:** Real-time text search and category filters calculated on the fly (Derived State) without mutating the single source of truth.
- **Local Persistence:** Automatic saving and loading of tasks using the browser's `localStorage`.
- **API Integration (Fetch):** Import sample tasks from an external server (JSONPlaceholder) managed via a State Machine pattern (idle, loading, success, error).
- **Polished UI/UX:** Loading spinners, gracefully handled error messages, and floating Toast notifications.

## Getting Started

1. Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Clone this repository to your local machine.
3. Open the terminal in the project folder and install dependencies:

   npm install

4. Start the local development server:

   npm run dev

5. Open your browser at the address shown in the terminal (usually http://localhost:5173).

## Project Structure

/
├── index.html        # Application HTML entry point
├── package.json      # npm dependencies and scripts
├── package-lock.json     # Lockfile for exact dependency versions
├── vite.config.js        # Vite bundler and plugin configuration
├── eslint.config.js      # ESLint rules and configuration for code quality
└── src/
    ├── main.jsx      # React entry point (Mounting)
    ├── index.css     # Global styles and Tailwind directives
    ├── App.jsx       # Main component (State, Logic, Fetching)
    ├── FilterContext.jsx # Global state management for search and filters (Context API)
    └── components/   # Isolated and reusable UI components