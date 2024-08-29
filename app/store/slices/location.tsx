import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SearchBar from "/Users/jacobcox/Code/rtk-weather/app/components/searchBar";

const fetchLocation = createAsyncThunk(
  "location/fetchLocation",
  async (query) => {
    const API_KEY: string = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const API: string = `http://api.openweathermap.org/geo/1.0/direct?q=${query}appid=${API_KEY}`;
    const response = await axios.get(API);

    console.log(response.data);
    return response.data;
  }
);

//create reducer for data to be put in store
//create second slice for weather api fetch
//figure out why response.data above isn't console logging (possibly query isn't returning)

export default fetchLocation;
