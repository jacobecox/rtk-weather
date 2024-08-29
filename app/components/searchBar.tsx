"use client";
import styles from "../page.module.css";
import { useState } from "react";
interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}
//onSearch will be passed onto another component that fetches the API request
const SearchBar = ({ placeholder, onSearch }: SearchBarProps): JSX.Element => {
  const [query, setQuery] = useState<string>("");

  //prevents running default requests when submitted
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder={placeholder}
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
