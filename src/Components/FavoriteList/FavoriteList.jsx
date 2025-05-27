import React from "react";
import "./favoriteList.css";

const FavoriteList = ({ favorites, onSelect, onAdd, onRemove }) => {
  return (
    <div className="favorite-list">
      <button className="add-button" onClick={onAdd}>
        Lägg till i favoriter
      </button>
      <ul>
        {favorites.map((city) => (
          <li key={city}>
            <div className="favorite-item">
              <button onClick={() => onSelect(city)}>{city}</button>
              <span className="remove" onClick={() => onRemove(city)}>
                ✕
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
