"use client";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store/configureStore";
import { fetchWeather } from "../store/slices/weather";
import { LocationParams } from "../store/slices/locations";
import { useEffect } from "react";

export default function SearchWeather() {
  const locations = useSelector(
    (state: LocationParams) => state.location.location
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (locations === undefined) {
      return;
    } //if there is no data in locations just return
    dispatch(fetchWeather(locations[0]));
  }, [dispatch, locations]);
  return locations?.map?.((location: LocationParams) => {
    return (
      //returning the city name
      <p key={location.name}>{location.name}</p>
    );
  });
}
