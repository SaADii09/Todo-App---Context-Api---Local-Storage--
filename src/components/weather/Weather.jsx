import React, { useEffect, useState } from "react";

const Weather = () => {
    const [location, setLocation] = useState({});

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);

    const fetchIP = async () => {
        return fetch(`https://api.ipify.org?format=json`)
            .then((response) => {
                // console.log("fetchip");
                return response.json();
            })
            .then((data) => data.ip)
            .catch((error) => {
                console.error("Error fetching IP:", error);
                setErr(true);
            });
    };

    const fetchLocation = async () => {
        setLoading(true);

        const ip = await fetchIP();

        if (ip) {
            const ipstackUrl = `https://api.ipstack.com/${ip}?access_key=${
                import.meta.env.VITE_IPSTACK_ACCESS_KEY
            }`;
            return fetch(ipstackUrl)
                .then((response) => {
                    // console.log("fetchlocation");
                    return response.json();
                })
                .then((data) => {
                    setLocation({
                        ip: data.ip,
                        country: data.country_name,
                        countryCode: data.country_code,
                        city: data.city,
                        lat: data.latitude,
                        lon: data.longitude,
                    });
                })
                .catch((error) => {
                    console.error("Error fetching location:", error);
                    setErr(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const fetchCurrentWeather = async () => {
        return fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${
                location.lat
            }&lon=${location.lon}&appid=${
                import.meta.env.VITE_OPENWEATHER_API_KEY
            }&units=metric`
        )
            .then((response) => {
                // console.log("fetchcurrentWeather");
                return response.json();
            })
            .then((data) => {
                setWeather(data);
            })
            .catch((error) => {
                setErr(true);
                console.error("Error fetching weather data:", error);
            });
    };

    const fetchForecastData = async () => {
        return fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${
                location.lat
            }&lon=${location.lon}&appid=${
                import.meta.env.VITE_OPENWEATHER_API_KEY
            }&units=metric`
        )
            .then((response) => {
                // console.log("fetchforecastData");
                return response.json();
            })
            .then((data) => {
                setForecast(data);
            })
            .catch((error) => {
                setErr(true);
                console.error("Error fetching forecast data:", error);
            });
    };

    // useEffect(() => {
    //     console.log(location);
    // }, [location]);
    useEffect(() => {
        fetchLocation();
    }, []);

    useEffect(() => {
        if (location.lat && location.lon) {
            fetchCurrentWeather();
            fetchForecastData();
        }
    }, [location]);

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
