"use client";
import styles from "../page.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLocation } from "../store/slices/locations";
import { AppDispatch } from "../store/configureStore";

interface SearchBarProps {
  placeholder: string;
}

const SearchBar = ({ placeholder }: SearchBarProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>(); //allows store to listen to events
  const [query, setQuery] = useState<string>(""); //allows query to be set as state

  //NEED TO FIX
  //do not return on change instead return on submit

  useEffect(() => {
    // Dispatch the action only if query is not an empty string
    if (query.trim() !== "") {
      dispatch(fetchLocation(query));
    }
  }, [query, dispatch]); // Dependency array includes query and dispatch

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); //prevents running default requests when submitted
    setQuery(""); //reverts to empty search field
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
