import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

function meanValue(data) {
  return ((data.day + data.night) / 2).toFixed(0);
}

const url =
  "https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=b310045a7116299b8bf0fcb43abf2bca&units=metric";

const initialState = {
  weatherData: {},
  forecastData: [],
  temp: 0,
  feels_like: 0,
  isLoading: true,
  isForecast: false,
};

export const getWeatherData = createAsyncThunk("data/getWeatherData", () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

const weatherSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getForecast: (state, action) => {
      state.weatherData = state.forecastData[action.payload];
      state.temp = meanValue(state.forecastData[action.payload].temp);
      state.feels_like = meanValue(
        state.forecastData[action.payload].feels_like
      );
      state.isForecast = true;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getWeatherData.pending]: (state) => {
      state.isLoading = true;
    },
    [getWeatherData.fulfilled]: (state, action) => {
      state.weatherData = action.payload.current;
      state.forecastData = action.payload.daily;
      state.temp = action.payload.current.temp.toFixed(0);
      state.feels_like = action.payload.current.feels_like.toFixed(0);
      state.isLoading = false;
      state.isForecast = false;
    },
    [getWeatherData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default weatherSlice.reducer;

export const { getForecast, getCurrentWeather } = weatherSlice.actions;
