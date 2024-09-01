"use client";
import styles from "./page.module.css";
import SearchBar from "./components/searchBar";
import { useEffect } from "react";
import { fetchLocation } from "./store/slices/locations";
import { useSelector } from "react-redux";

export default function App() {

  // const locations = useSelector((state) => state.location.location);

  // const renderLocations = () => {
  //   return locations.map((location) => {
  //     return(
  //       <p key={location.id}>location: {location}</p>
  //     )
  //   })
  // }

  return (
    <main className={styles.main}>
      <header className="header">
        <h1>Weather App</h1>
        <br />
        <SearchBar placeholder="search your city" />
        {/* <ul>{renderLocations()}</ul> */}
      </header>
    </main>
  );
}
