import React, { useEffect, useState } from "react";

const Weather = () => {
    const [location, setLocation] = useState({});

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);

    const [selectedcountry, setSelectedcountry] = useState("");
    const [selectedcity, setSelectedcity] = useState("");

    const [allcountry, setAllcountry] = useState([]);
    const [allcity, setAllcity] = useState([]);

    const [searchCountry, setSearchCountry] = useState("");
    const [searchCity, setSearchCity] = useState("");

    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState({});

    const fetchLocation = async () => {
        setLoading(true);
        fetch(
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
            })
            .catch((error) => {
                setErr(true);
                console.error("Error fetching location:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchCurrentWeather = async () => {
        return fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch current weather");
                }
                return JSON.parse(response);
            })
            .then((data) => {
                setWeather(data);
            })
            .catch((err) => {
                setErr(err.message);
            });
    };

    // Function to fetch forecast data
    const fetchForecastData = async () => {
        console.log(
            `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${location.lat}&lon=${location.lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );
        return fetch(
            `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${location.lat}&lon=${location.lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch forecast data");
                }
                return JSON.parse(response);
            })
            .then((data) => {
                setForecast(data);
            })
            .catch((err) => {
                setErr(err.message);
            });
    };

    // useEffect to fetch both current weather and forecast data
    useEffect(() => {
        setLoading(true);
        fetchLocation()
            .then(() => {
                return Promise.all([
                    fetchCurrentWeather(),
                    fetchForecastData(),
                ]);
            })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading weather data...</div>;
    }

    if (err) {
        return <div>Error: {err}</div>;
    }

    return (
        <>
            <h1>🌦️Weather Forcast</h1>
            {location && (
                <p>
                    {location.city}, {location.country} , {location.lon},
                    {location.lat}
                </p>
            )}

            <h2>Current Weather</h2>
            {/* {weather && (
                <div className="current-weather">
                    <h3>{weather.weather.description}</h3>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Feels Like: {weather.main.feels_like}°C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                    <p>Wind Direction: {weather.wind.deg}°</p>
                </div>
            )} */}
            {/*
                <h2>Weather Forecast</h2>
                <div className="forecast-container">
                    {/* {forecast &&
                        forecast[list].map((forecasti) => (
                            <div className="forecast-card" key={forecasti.dt}>
                                <h4>
                                    {new Date(
                                        forecasti.dt * 1000
                                    ).toLocaleString()}
                                </h4>
                                <p>Temperature: {forecasti.main.temp}°C</p>
                                <p>{forecasti.weather[0].description}</p>
                                <p>Wind Speed: {forecasti.wind.speed} m/s</p>
                            </div>
                        ))} 
                </div>
            </div>
            */}
        </>
    );
};

export default Weather;
