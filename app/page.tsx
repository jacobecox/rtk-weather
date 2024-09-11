"use client";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/searchBar";
import RenderWeather from "./components/renderWeather";
import { useState } from "react";

export default function App(): JSX.Element {
  return (
    <main className={styles.main}>
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <h1 className="text-center">Weather App</h1>
            <br />
            <SearchBar placeholder="search your city" />
            <br />
            <hr />
            <div className="col-md-3">
              <h6 className="text-center">City</h6>
            </div>
            <div className="col-md-3">
              <h6 className="text-center">Temperature (ºF)</h6>
            </div>
            <div className="col-md-3">
              <h6 className="text-center">Humidity (%)</h6>
            </div>
            <div className="col-md-3">
              <h6 className="text-center">Pressure (hPa)</h6>
            </div>
            <hr />

            <br />

            <RenderWeather />
          </div>
        </div>
      </header>
    </main>
  );
}
