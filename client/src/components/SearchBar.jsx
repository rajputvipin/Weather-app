import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
    setSearchHistory(savedHistory);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      const updatedHistory = [city.trim(), ...searchHistory.filter(item => item !== city.trim())].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem('weatherSearchHistory', JSON.stringify(updatedHistory));
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSearch} className="input-group">
        <input
          type="text"
          className="form-control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
        />
        <button 
          className="btn btn-primary" 
          type="submit"
          disabled={isLoading || !city.trim()}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
