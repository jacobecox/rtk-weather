"use client";
import styles from "./page.module.css";
import SearchBar from "./components/searchBar";
import { useEffect } from "react";
import { fetchLocations } from "./store/slices/locations";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const RenderLocation = () => {
    const { state } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchLocations());
    }, [dispatch]);

    const location = useSelector((state) => state.locations);
  };

  return (
    <main className={styles.main}>
      <header className="header">
        <h1>Weather App</h1>
        <br />
        <SearchBar placeholder="search your city" />
        <RenderLocation />
      </header>
    </main>
  );
}
