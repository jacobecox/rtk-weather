"use client";
import styles from "../page.module.css";
import { useState } from "react";
import SearchBar from "../components/searchBar";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
};

export default SearchResults;
