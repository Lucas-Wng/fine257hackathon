// src/App.jsx

import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [showCookiePopup, setShowCookiePopup] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  };

  const handleAcceptCookies = () => {
    window.location.href = "https://www.google.com/maps/search/cookies/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="flex w-full max-w-md">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none"
          placeholder="Search [Placeholder]..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      {showCookiePopup && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-lg max-w-xs w-full text-center z-50 border border-gray-200">
          <h2 className="text-base font-semibold mb-1">We use cookies</h2>
          <p className="mb-3 text-gray-600 text-sm">This site uses cookies to enhance your experience. Do you accept cookies?</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={handleAcceptCookies}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
            >
              Accept
            </button>
            <button
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded cursor-not-allowed text-sm"
              // No onClick for decline
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;