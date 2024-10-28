import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedCities: [],
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    saveCity: (state, action) => {
      state.savedCities.push(action.payload);
    },
    removeCity: (state, action) => {
      state.savedCities = state.savedCities.filter(city => city !== action.payload);
    },
  },
});

export const { saveCity, removeCity } = userProfileSlice.actions;
export default userProfileSlice.reducer;
