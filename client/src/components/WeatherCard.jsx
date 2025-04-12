import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const WeatherCard = ({ data }) => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className={`card mt-4 ${darkMode ? 'bg-dark text-white' : ''}`}>
      <div className="card-body">
        <h2 className="card-title">{data.name}</h2>
        <div className="row">
          <div className="col-md-6">
            <p className="display-4">
              {Math.round(data.main.temp)}°C
            </p>
            <p>{data.weather[0].description}</p>
          </div>
          <div className="col-md-6">
            <ul className="list-group">
              <li className={`list-group-item ${darkMode ? 'bg-secondary text-white' : ''}`}>
                Feels like: {Math.round(data.main.feels_like)}°C
              </li>
              <li className={`list-group-item ${darkMode ? 'bg-secondary text-white' : ''}`}>
                Humidity: {data.main.humidity}%
              </li>
              <li className={`list-group-item ${darkMode ? 'bg-secondary text-white' : ''}`}>
                Wind: {data.wind.speed} m/s
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
