import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate('/searched/' + searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="m-32 flex items-center space-x-4 content-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
