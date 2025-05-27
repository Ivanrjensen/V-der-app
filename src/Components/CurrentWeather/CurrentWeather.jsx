import React from "react";
import "./currentWeather.css";

const CurrentWeather = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: weatherDetails, wind, dt } = weather;

  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const icon = weatherDetails[0].icon;
  const rawDescription = weatherDetails[0].description;

  const translateWeatherDescription = (desc) => {
    const translations = {
      "clear sky": "Klart",
      "few clouds": "Lätt molnighet",
      "scattered clouds": "Spridda moln",
      "broken clouds": "Molnigt",
      "overcast clouds": "Mulet",
      "light rain": "Lätt regn",
      "moderate rain": "Måttligt regn",
      "heavy intensity rain": "Kraftigt regn",
      "light snow": "Lätt snö",
      snow: "Snö",
      thunderstorm: "Åska",
      mist: "Dimma",
    };
    return translations[desc.toLowerCase()] || desc;
  };

  const description = translateWeatherDescription(rawDescription);

  const date = new Date(dt * 1000);

  const weekday = date.toLocaleDateString("sv-SE", {
    weekday: "long",
    timeZone: "Europe/Stockholm",
  });

  const formattedDate = date.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Stockholm",
  });

  const formattedTime = date.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Stockholm",
  });

  return (
    <div className="current-weather">
      <h2>{name}</h2>
      <p style={{ marginBottom: 0 }}>{weekday}</p>
      <p style={{ marginTop: 0, fontSize: "0.9rem", color: "#555" }}>
        {formattedDate}, kl {formattedTime}
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        width={60}
      />
      <p>{description}</p>
      <p>🌡️ {temperature}°C</p>
      <p>🌡️ Känns som: {feelsLike}°</p>
      <p>💧 Luftfuktighet: {humidity}%</p>
      <p>🌬️ Vind: {windSpeed} m/s</p>
    </div>
  );
};

export default CurrentWeather;
