import React from 'react';
import TimeDisplay from './components/TimeDisplay';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Time & Date API</h1>
        <p className="text-gray-600 max-w-md">
          A simple REST API that returns the current time and date of the user
        </p>
      </header>
      
      <TimeDisplay />
      
      <footer className="mt-10 text-center text-gray-500 text-sm">
        <p>API Endpoint: <code className="bg-gray-100 px-2 py-1 rounded">GET /api/time</code></p>
        <p className="mt-2">© {new Date().getFullYear()} Time & Date API</p>
      </footer>
    </div>
  );
}

export default App;