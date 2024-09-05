"use client";
import styles from "./page.module.css";
import SearchBar from "./components/searchBar";
import { useEffect } from "react";
import { fetchLocation } from "./store/slices/locations";
import { useDispatch, useSelector } from "react-redux";

export default function App() {

  const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchLocation());
	}, [dispatch]);

  const locations = useSelector((state) => state.location.location);

  const renderLocation = () => {
		return locations.map?.((location) => {
			return (
				<span className='label label-primary' key={location}>
					{location.lat}, {location.lon}
				</span>
			);
		});
	};

  return (
    <main className={styles.main}>
      <header className="header">
        <h1>Weather App</h1>
        <br />
        <SearchBar placeholder="search your city" />
        <p>coordinates: {renderLocation()}</p>
      </header>
    </main>
  );
}
