import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../configureStore";

const API_KEY: string = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const fetchLocation = createAsyncThunk<Location, QueryPayload>(
  "locations/fetchLocations",
  async (query: QueryPayload) => {
    const response = await axios.get<Location>(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`
    );
    return response.data;
  }
);

// stuck trying to store data from fetchLocations
export const StoreData = (response) => {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(setLocation(response.data));
};

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
  name: "locations",
  initialState,
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
      (state, action: PayloadAction<Location>) => {
        state.loading = false;
        state.location = action.payload.location;
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
