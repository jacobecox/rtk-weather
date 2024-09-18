import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LocationParams } from "./locations";

const API_KEY: string = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const fetchWeather = createAsyncThunk<WeatherData, LocationParams>(
  "weather/fetchWeather",
  async (locations: LocationParams) => {
    if (locations === undefined) {
      return; // Don't make the API request if the query is empty
    }
    locations?.map((location: LocationParams, index: number) => {
      return location.lat, location.lon;
    });

    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=imperial`
    );
    return response.data;
  }
);

export interface WeatherContainer {
  //this is what the weather data is stored in the api call
  main: WeatherData;
  dt: number;
  list: any;
}

export interface WeatherData {
  temp: number;
  pressure: number;
  humidity: number;
  weather: any;
}

interface TempData {
  tempArray: [];
}

interface FetchStatus {
  weather: WeatherData[];
  temp: TempData[];
  loading: boolean;
  error: string | null;
}

const initialState: FetchStatus = {
  weather: [],
  temp: [],
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState, //state before reducer is used
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchWeather.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.weather.push(action.payload);
      }
    );
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default weatherSlice.reducer;
