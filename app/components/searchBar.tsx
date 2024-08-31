"use client";
import styles from "../page.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../store/slices/search";

interface SearchBarProps {
  placeholder: string;
}

const SearchBar = ({ placeholder }: SearchBarProps): JSX.Element => {
  const dispatch = useDispatch(); //allows store to listen to events
  const [query, setQuery] = useState<string>(""); //allows query to be set as state

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); //prevents running default requests when submitted
    dispatch(setSearchQuery(query)); //assigns the query to store via slice when searched
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder={placeholder}
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setQuery(e.target.value);
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
