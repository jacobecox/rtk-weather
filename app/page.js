"use client";
import styles from "./page.module.css";
import SearchBar from "./components/searchBar";
import SearchWeather from "./components/searchWeather";

export default function App() {

  return (
    <main className={styles.main}>
      <header className="header">
        <h1>Weather App</h1>
        <br />
        <SearchBar placeholder="search your city" />
        <SearchWeather/>
      </header>
    </main>
  );
}
