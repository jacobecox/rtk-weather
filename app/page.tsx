"use client";
import styles from "./page.module.css";
import SearchBar from "./components/searchBar";
import { useSelector } from "react-redux";
import { WeatherData, Main } from "./store/slices/weather";
import RenderWeather from "./components/renderWeather";
import { Sparklines } from "react-sparklines";

export default function App(): JSX.Element {
  // const conditions = useSelector((state: WeatherData) => state.weather.weather);
  // const renderWeather = () => {
  //   return conditions?.list?.map?.((weather: Main) => {
  //     return (
  //       <p key={weather.main.dt}>
  //         weather= temp: {weather.main.temp}, pressure: {weather.main.pressure},
  //         humidity: {weather.main.humidity}
  //       </p>
  //     );
  //   });
  // };
  return (
    <main className={styles.main}>
      <header className="header">
        <h1>Weather App</h1>
        <br />
        <SearchBar placeholder="search your city" />
        <RenderWeather />
      </header>
    </main>
  );
}
