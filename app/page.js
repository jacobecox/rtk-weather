"use client";
import styles from "./page.module.css";
import SearchBar from "./components/searchBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./store/slices/weather";

export default function App() {

  //NEEDS FIXING: error about updating component App() while rendering App() not possible

  const locations = useSelector((state) => state.location.location);
  const dispatch = useDispatch();

  const renderLocation = () => {
		return locations.map?.((location) => {
      dispatch(fetchWeather(location))
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
