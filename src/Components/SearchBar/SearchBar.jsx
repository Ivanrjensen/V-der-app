import React, { useState } from "react";
import "./searchBar.css";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleClick = () => {
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Sök stad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleClick}>Sök</button>
    </div>
  );
};

export default SearchBar;
