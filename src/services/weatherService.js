const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

export async function fetchForecastData(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("Forecast not found");
    const data = await response.json();

    return data.list;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return [];
  }
}

export async function fetchWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("Location not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching location weather:", error);
    return null;
  }
}
