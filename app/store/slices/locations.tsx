import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../configureStore";

//READ ME
//I've been able to see the data console logged in response.data so I know the data is passed into the store. Redux devtools have been giving me issues by not running every time I pass a value or refresh the browser. Not sure if it's something I'm not doing.
//the thing I am unable to get past right now is viewing the data on page.js and I'm not 100% sure what the issue could be. I am using useEffect to mount to the store and mapping what I believe is the data. Not sure how to find the parameters inside the data within the store.
//Thanks for any help!

const API_KEY: string = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const fetchLocation = createAsyncThunk<Location, QueryPayload>(
  "location/fetchLocation",
  async (query: QueryPayload) => {
    //query is whatever is searched in SearchBar
    const response = await axios.get(
      // `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`
      "./data.json"
    );
    const dispatch = useDispatch<AppDispatch>();
    dispatch(setLocation(response.data)); //this stores the api's response.data in the store for global access
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
