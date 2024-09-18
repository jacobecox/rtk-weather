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

  console.log("locations:", locations);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (locations === undefined) {
      return;
    } //if there is no data in locations just return
    dispatch(fetchWeather(locations));
  }, [dispatch, locations]);

  return locations?.map((location: LocationParams, index: number) => {
    if (location === undefined) {
      return (
        <div key={index} className="text-center">
          <p>Please enter a valid city name</p>
        </div>
      );
    }

    return (
      //returning the city name
      <div key={index} className="text-center">
        <p>{location[length].name}</p>
        <br />
      </div>
    );
  });
}
