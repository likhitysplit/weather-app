// slices/weatherSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weatherData: null,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
  },
});

export const { updateWeatherData, setWeatherError } = weatherSlice.actions;

export const fetchWeatherData = (city) => async (dispatch) => {
  const key = '147f54d9da4d40848ad193205243009';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3`;

  const response = await fetch(`${url}`);
    const data = await response.json();
    dispatch(updateWeatherData(data)); 
    console.log(data);

};



export default weatherSlice.reducer;
