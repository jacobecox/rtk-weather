import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { RootState } from "../configureStore";

const API_KEY: string = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async () => {
    const query: string = useSelector((state: RootState) => state.search.query);
    const dispatch = useDispatch();
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`
    );
    dispatch(setLocation(response.data));
    return response.data;
  }
);

interface SearchLocation {
  //set types for initialState
  locations: [];
  status: string;
  error: string;
}

const initialState: SearchLocation = {
  locations: [],
  status: "idle",
  error: null,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<[]>) {
      state.locations = action.payload; //state.location is where the location is stored
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLocations.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.locations = action.payload;
    });
    builder.addCase(fetchLocations.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { setLocation } = locationsSlice.actions;
export default locationsSlice.reducer;
