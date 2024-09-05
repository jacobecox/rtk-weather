import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const API_KEY: string = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const fetchLocation = createAsyncThunk<Location, QueryPayload>(
  "location/fetchLocation",
  async (query: QueryPayload) => {
    if (query.trim() === "") {
      return; // Don't make the API request if the query is empty
    }
    //query is whatever is searched in SearchBar
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`
      // "./data.json"
    );
    return response.data;
  }
);

type QueryPayload = string;

interface LocationParams {
  lat: number;
  lon: number;
}

interface Location {
  location: LocationParams[];
}

interface FetchStatus {
  location: LocationParams[];
  loading: boolean;
  error: string | null;
}

const initialState: FetchStatus = {
  location: [],
  loading: false,
  error: null,
};

export const locationsSlice = createSlice({
  name: "location",
  initialState, //state before reducer is used
  reducers: {
    setLocation(state, action: PayloadAction<[]>) {
      state.location = action.payload; //state.location is where the location is stored
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchLocation.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.location = action.payload;
      }
    );
    builder.addCase(fetchLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setLocation } = locationsSlice.actions;
export default locationsSlice.reducer;
