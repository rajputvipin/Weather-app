import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Weather route
app.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;

    // Validate city parameter
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    // Make request to OpenWeatherMap API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHERMAP_API_KEY}b&units=metric`;
    console.log('Making request to:', apiUrl);
    
    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    }).catch(err => {
      console.error('Axios Error:', err.message);
      if (err.response) {
        console.error('Response Status:', err.response.status);
        console.error('Response Data:', err.response.data);
      }
      throw err;
    });

    console.log('API Response:', response.data);
    // Extract relevant data
    const {
      main: { temp, humidity },
      weather: [{ main: condition, icon }],
      wind: { speed: windSpeed }
    } = response.data;

    // Send structured response
    res.json({
      temperature: temp,
      condition,
      icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      humidity,
      windSpeed
    });

  } catch (error) {
    // Handle API errors
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    
    console.error('Weather API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'Weather API is running' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});