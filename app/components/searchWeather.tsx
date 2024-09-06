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
    dispatch(fetchWeather(locations[0]));
  }, [dispatch, locations]);
  return locations.map?.((location: LocationParams) => {
    return (
      <p key={location.name}>
        coordinates: {location.name} {location.lat} {location.lon}
      </p>
    );
  });
}
