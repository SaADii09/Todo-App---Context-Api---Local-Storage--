import React, { useEffect, useState } from "react";

const Weather = () => {
    const [location, setLocation] = useState({});

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);

    const fetchLocation = async () => {
        setLoading(true);
        return fetch(
            "http://ip-api.com/json/?fields=country,countryCode,city,zip,lat,lon,query"
        )
            .then((response) => response.json())
            .then((data) => {
                setLocation({
                    ip: data.query,
                    country: data.country,
                    countrycode: data.countryCode,
                    city: data.city,
                    zip: data.zip,
                    lon: data.lon,
                    lat: data.lat,
                });
                setLoading(false);
            })
            .catch((error) => {
                setErr(true);
                console.error("Error fetching location:", error);
            });
    };

    const fetchCurrentWeather = async () => {
        if (!location.lat || !location.lon)
            return Promise.reject("Location not available");
        return fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${
                location.lat
            }&lon=${location.lon}&appid=${
                import.meta.env.VITE_OPENWEATHER_API_KEY
            }&units=metric`
        )
            .then((response) => response.json())
            .then((data) => {
                setWeather(data);
            })
            .catch((error) => {
                setErr(true);
                console.error("Error fetching weather data:", error);
            });
    };

    const fetchForecastData = async () => {
        if (!location.lat || !location.lon)
            return Promise.reject("Location not available");
        return fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${
                location.lat
            }&lon=${location.lon}&appid=${
                import.meta.env.VITE_OPENWEATHER_API_KEY
            }&units=metric`
        )
            .then((response) => response.json())
            .then((data) => {
                setForecast(data);
            })
            .catch((error) => {
                setErr(true);
                console.error("Error fetching forecast data:", error);
            });
    };

    useEffect(() => {
        setLoading(true);
        fetchLocation()
            .then(() => {
                return Promise.all([
                    fetchCurrentWeather(),
                    fetchForecastData(),
                ]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [location.lat, location.lon]);

    if (loading) {
        return <div>Loading weather data...</div>;
    }

    if (err) {
        return <div>sorry! Error occured! </div>;
    }

    const getWeatherEmoji = (description) => {
        switch (description.toLowerCase()) {
            case "clear sky":
                return "☀️";
            case "few clouds":
                return "🌤️";
            case "scattered clouds":
                return "🌥️";
            case "broken clouds":
                return "☁️";
            case "shower rain":
                return "🌧️";
            case "rain":
                return "🌧️";
            case "thunderstorm":
                return "⛈️";
            case "snow":
                return "❄️";
            case "mist":
                return "🌫️";
            case "haze":
                return "🌫️";
            default:
                return "🌥️";
        }
    };

    return (
        <div className="weather-container">
            <h1>🌦️ Weather Forecast</h1>

            {location && (
                <div className="location-container">
                    <p className="location-info">
                        Location(from your IP): {location.city},{" "}
                        {location.country}
                    </p>
                    <button className="location-btn" onClick={fetchLocation}>
                        Refresh
                    </button>
                </div>
            )}

            <h2>Current Weather</h2>
            {weather && (
                <div className="current-weather">
                    <h3 className="weather-description">
                        {getWeatherEmoji(weather.weather[0].description)}
                        {weather.weather[0].description.toUpperCase()}
                    </h3>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Feels Like: {weather.main.feels_like}°C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                    <p>Wind Direction: {weather.wind.deg}°</p>
                </div>
            )}

            <h2>Weather Forecast</h2>
            <div className="forecast-container">
                {forecast &&
                    forecast.list.map((forecastItem) => (
                        <div className="forecast-card" key={forecastItem.dt}>
                            <h4>
                                {new Date(
                                    forecastItem.dt * 1000
                                ).toLocaleString()}
                            </h4>
                            <p>
                                {getWeatherEmoji(
                                    forecastItem.weather[0].description
                                )}
                                {forecastItem.weather[0].description.toUpperCase()}
                            </p>
                            <p>Temperature: {forecastItem.main.temp}°C</p>
                            <p>Wind Speed: {forecastItem.wind.speed} m/s</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Weather;
