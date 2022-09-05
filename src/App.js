import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import WeatherCard from "./Components/UI/weather-card";
import Menu from "./Components/Menu/Menu";
import Card from "./Components/UI/Modals/Card";
import Chart from "./Components/UI/Chart/Chart";
import { getWeatherData } from "./Store/weatherSlice";
import "./App.scss";

function App() {
  useEffect(() => {
    dispatch(getWeatherData());
  }, []);

  const { weatherData, temp, feels_like, isForecast, isLoading } = useSelector(
    (store) => store.data
  );
  const dispatch = useDispatch();

  const thessalonikiDate = new Date(weatherData.dt * 1000);

  return (
    <>
      <header className="home__header">
        <h2 className="home__title">MoisThess</h2>
        <h3 className="home__subtitle">Humidity is a given</h3>
      </header>
      <Card className="current-weather-card">
        {isLoading ? (
          <div>Scanning the sky . . .</div>
        ) : (
          <WeatherCard
            clouds={weatherData.clouds}
            humidity={weatherData.humidity}
            pressure={weatherData.pressure}
            wind_speed={weatherData.wind_speed}
            wind_deg={weatherData.wind_deg}
            icon={weatherData.weather[0].icon}
            description={weatherData.weather[0].description}
            date={thessalonikiDate}
            temp={temp}
            feels_like={feels_like}
            isForecast={isForecast}
          />
        )}
      </Card>
      <Menu />
    </>
  );
}

export default App;
