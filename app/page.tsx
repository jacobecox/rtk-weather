"use client";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/searchBar";
import RenderHumidity from "./components/renderHumidity";
import RenderTemp from "./components/renderTemp";
import RenderPressure from "./components/renderPressure";
import SearchWeather from "./components/searchWeather";

export default function App(): JSX.Element {
  return (
    <main className={styles.main}>
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <h1 className="text-center">Weather App</h1>
            <br />
            <SearchBar placeholder="search your city" />
            <div className="col-md-3">
              <SearchWeather />
            </div>
            <div className="col-md-3">
              <RenderTemp />
            </div>
            <div className="col-md-3">
              <RenderHumidity />
            </div>
            <div className="col-md-3">
              <RenderPressure />
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
