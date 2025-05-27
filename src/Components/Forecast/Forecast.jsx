import React from "react";
import "./forecast.css";

const Forecast = ({ forecast }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const groupedForecast = forecast.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0];
    if (date >= tomorrowStr) {
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
    }
    return acc;
  }, {});

  const dates = Object.keys(groupedForecast).slice(0, 5);

  const getWeekdayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("sv-SE", { weekday: "long" });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("sv-SE", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="forecast">
      <div className="forecast-container">
        {dates.map((date) => {
          const items = groupedForecast[date];

          const temps = items.map((i) => i.main.temp);
          const min = Math.round(Math.min(...temps));
          const max = Math.round(Math.max(...temps));

          const representative =
            items.find((i) => i.dt_txt.includes("12:00:00")) || items[0];

          const iconUrl = `https://openweathermap.org/img/wn/${representative.weather[0].icon}@2x.png`;

          return (
            <div className="forecast-card" key={date}>
              <h3>{getWeekdayName(date)}</h3>
              <p className="forecast-date">{formatDate(date)}</p>
              <img src={iconUrl} alt="Väderikon" width={60} />
              <p>
                🌡️ {min}° / {max}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
