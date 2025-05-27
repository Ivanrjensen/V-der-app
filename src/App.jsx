import React, { useState, useEffect } from "react";
import "./styles/app.css";
import CurrentWeather from "./Components/CurrentWeather/CurrentWeather";
import Forecast from "./Components/Forecast/Forecast.jsx";
import SearchBar from "./Components/SearchBar/SearchBar";
import FavoriteList from "./Components/FavoriteList/FavoriteList";
import {
  fetchWeatherData,
  fetchForecastData,
  fetchWeatherByCoords,
} from "./services/weatherService";
import { saveToLocalStorage, getFromLocalStorage } from "./utils/localStorage";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState(
    getFromLocalStorage("favorites") || []
  );

  const handleSearch = async (city) => {
    const data = await fetchWeatherData(city);
    const forecastData = await fetchForecastData(city);
    setWeather(data);
    setForecast(forecastData);
  };

  const addToFavorites = (city) => {
    if (!favorites.includes(city)) {
      const updated = [...favorites, city];
      setFavorites(updated);
      saveToLocalStorage("favorites", updated);
    }
  };

  const removeFromFavorites = (city) => {
    const updated = favorites.filter((fav) => fav !== city);
    setFavorites(updated);
    saveToLocalStorage("favorites", updated);
  };

  const handleFavoriteClick = (city) => {
    handleSearch(city);
  };

  useEffect(() => {
    console.log("Trying to get user location...");
    navigator.geolocation.getCurrentPosition(
      async () => {
        const lat = 59.3;
        const lon = 18.0;
        const data = await fetchWeatherByCoords(lat, lon);
        if (data?.name) {
          await handleSearch(data.name);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      <CurrentWeather weather={weather} />
      <Forecast forecast={forecast} />

      <FavoriteList
        favorites={favorites}
        onSelect={handleFavoriteClick}
        onAdd={() => weather && addToFavorites(weather.name)}
        onRemove={removeFromFavorites}
      />
    </div>
  );
};

export default App;
