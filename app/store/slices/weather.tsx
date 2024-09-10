import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LocationParams } from "./locations";

const API_KEY: string = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const fetchWeather = createAsyncThunk<WeatherData, LocationParams>(
  "weather/fetchWeather",
  async (location) => {
    if (location === undefined) {
      return; // Don't make the API request if the query is empty
    }
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=imperial`
    );
    return response.data;
  }
);
export interface List {
  list: Main;
}

export interface Main {
  //this is what the weather data is stored in the api call
  main: WeatherData;
  dt: number;
}

export interface WeatherData {
  temp: number;
  pressure: number;
  humidity: number;
  weather: any;
}

interface FetchStatus {
  weather: WeatherData[];
  loading: boolean;
  error: string | null;
}

const initialState: FetchStatus = {
  weather: [],
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState, //state before reducer is used
  reducers: {
    setWeather(state, action: PayloadAction<[]>) {
      state.weather = action.payload; //state.weather is where the weather is stored
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchWeather.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log(action);
        state.loading = false;
        state.weather = action.payload;
      }
    );
    builder.addCase(fetchWeather.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
