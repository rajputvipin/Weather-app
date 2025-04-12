import React, { useState, useContext } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WeatherApp.css';

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      // Pointing to backend server at port 5000
      const response = await axios.get(`http://localhost:5000/weather?q=${city}`);
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`weather-app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="app-container">
        <h1 className="app-title font-bold">Know Current Weather</h1>
        <SearchBar onSearch={handleSearch} isLoading={loading} />
        
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-text">Loading weather data...</div>}
        {weather && !loading && !error && (
          <WeatherCard data={weather} darkMode={darkMode} />
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
