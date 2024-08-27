import styles from "./page.module.css";
import { SearchBar } from "./components/searchBar";

export default function App(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1>Weather App</h1>
      <SearchBar placeholder="search bar" />
    </main>
  );
}
