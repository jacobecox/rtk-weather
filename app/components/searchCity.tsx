"use client";
import { useSelector, useDispatch } from "react-redux";
import { LocationParams } from "../store/slices/locations";
import { useEffect } from "react";
import { AppDispatch } from "../store/configureStore";
import { fetchWeather } from "../store/slices/weather";

export default function SearchCity() {
  const locations = useSelector(
    (state: LocationParams) => state.location.location
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchWeather(locations));
  }, [dispatch, locations]);

  return locations?.map((location: LocationParams, index: number) => {
    if (locations[locations.length - 1][0] === undefined) {
      alert("Please enter a valid city name");
      return;
      // trying to address edge casing or invalid entry, alert is mapped in response but I could not figure out how to only alert once.
    }
    return (
      <div key={index} className="text-center">
        <br />
        <br />
        <p>{location[location.length - 1].name}</p>
        <br />
        <br />
      </div>
    );
  });
}
