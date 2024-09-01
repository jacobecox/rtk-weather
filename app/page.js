"use client";
import styles from "./page.module.css";
import SearchBar from "./components/searchBar";
import { useEffect } from "react";
import { fetchLocations } from "./store/slices/locations";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchLocations());
	}, [dispatch]);

  const locations = useSelector((state) => state.locations.locations);

  const renderLocations = () => {
    return locations.map((location) => {
      return(
        <p key={location.id}>location: {location}</p>
      )
    })
  }

  return (
    <main className={styles.main}>
      <header className="header">
        <h1>Weather App</h1>
        <br />
        <SearchBar placeholder="search your city" />
        <ul>{renderLocations()}</ul>
      </header>
    </main>
  );
}
