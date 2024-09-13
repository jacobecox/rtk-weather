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

// export const fetchTemp = createAsyncThunk(
//   "temp/fetchTemp",
//   async (tempArray) => {
//     const response = await axios.get("./components/renderTemp");
//     console.log(response);
//     return response;
//   }
// );

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
  reducers: {
    setWeather(state, action: PayloadAction<any>) {
      state.weather = action.payload; //state.weather is where the weather is stored
      console.log(action);
    },
    // setTemp: (state, action: PayloadAction<any>) => {
    //   state.temp = action.payload;
    //   console.log(action);
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchWeather.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.weather = action.payload;
        console.log(action);
      }
    );
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // builder.addCase(fetchTemp.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(
    //   fetchTemp.fulfilled,
    //   (state, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.temp = action.payload;
    //     console.log(action);
    //   }
    // );
    // builder.addCase(fetchTemp.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
