"use client";
import styles from "./page.module.css";
import SearchBar from "./components/searchBar";
import RenderHumidity from "./components/renderHumidity";
import SearchWeather from "./components/searchWeather";

export default function App(): JSX.Element {
  return (
    <main className={styles.main}>
      <header className="header">
        <h1>Weather App</h1>
        <br />
        <SearchBar placeholder="search your city" />
        <SearchWeather />
        <RenderHumidity />
      </header>
    </main>
  );
}
