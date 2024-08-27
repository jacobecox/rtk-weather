"use client";
import { useState } from "react";
interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: SearchBarProps): JSX.Element => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
