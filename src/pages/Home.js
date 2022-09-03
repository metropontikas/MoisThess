import "./Home.scss";
import WeatherCard from "../Components/UI/items/weather-card";
import Button from "../Components/UI/items/button";
import { useEffect, useReducer, useState } from "react";

function meanValue(data) {
  return ((data.day + data.night) / 2).toFixed(0);
}

const Home = (props) => {
  const [isForecast, setForecast] = useState(false);

  /*     const fetchWeatherHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      setLoadedData(data);
      const { clouds, dt, feels_like, humidity, pressure, temp, weather } =
        loadedData.current;
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchWeatherHandler();
  }, [fetchWeatherHandler]);
  console.log(loadedData.current);
  */

  const ACTIONS = {
    getForecast: "getForecast",
    getCurrentWeather: "getCurrentWeather",
  };
  const initialState = {
    data: props.data.current,
    temp: props.data.current.temp.toFixed(0),
    feels_like: props.data.current.feels_like.toFixed(0),
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.getForecast:
        return {
          data: action.value,
          temp: meanValue(action.value.temp),
          feels_like: meanValue(action.value.feels_like),
        };
      case ACTIONS.getCurrentWeather:
        return {
          data: action.value,
          temp: action.value.temp.toFixed(0),
          feels_like: action.value.temp.toFixed(0),
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const thessalonikiDate = new Date(state.data.dt * 1000);

  function forecastDate(dateObject) {
    return new Date(dateObject.setDate(dateObject.getDate()));
  }
  console.log(thessalonikiDate);
  /*     function forecastDate(dateObject, database, dayIndex) {
      return new Date(
        dateObject.setDate(
          dateObject.getDate() + database.daily.indexOf(database.daily[dayIndex])
        )
      );
    } */

  /*   const thessalonikiDate = new Date(props.data.current.dt * 1000);
   */

  function foreCastHandler(key) {
    return () => {
      setForecast(true);
      dispatch({ type: ACTIONS.getForecast, value: key });
    };
  }
  function currentWeatherHandler(key) {
    return () => {
      setForecast(false);
      dispatch({ type: ACTIONS.getCurrentWeather, value: key });
    };
  }
  return (
    <>
      <header className="home__header">
        <h2 className="home__title">Weather App</h2>
        <h3 className="home__subtitle">Chill out, we got you!</h3>
      </header>
      <Button
        key="current"
        onClick={currentWeatherHandler(props.data.current)}
        value={props.data.current}
        isCurrent={true}
      />
      {props.data.daily.map((object) => {
        return (
          <Button
            key={props.data.daily.indexOf(object)}
            onClick={foreCastHandler(object)}
            forecastDate={object.dt}
          />
        );
      })}

      <WeatherCard
        clouds={state.data.clouds}
        humidity={state.data.humidity}
        pressure={state.data.pressure}
        wind_speed={state.data.wind_speed}
        wind_deg={state.data.wind_deg}
        icon={state.data.weather[0].icon}
        description={state.data.weather[0].description}
        date={forecastDate(thessalonikiDate, props.data)}
        temp={state.temp}
        feels_like={state.feels_like}
        isForecast={isForecast}
      />
    </>
  );
};

export default Home;
