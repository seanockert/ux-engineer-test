import React from "react";
import ShowPreview from "./ShowPreview";

const emptyStates = [
  {
    name: "Breaking Bad",
    description: "No shows here. But if you're the one who knocks, try...",
    id: "169",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg"
  },
  {
    name: "Game of Thrones",
    description: "Zip. Nada. If you like to drink and know things, try...",
    id: "82",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg"
  },
  {
    name: "The Last of Us",
    description: "No shows about that. But there's a fungus among us. Try...",
    id: "46562",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/444/1110831.jpg"
  },
  {
    name: "Wednesday",
    description: "No results for Monday, or Tuesday. Try...",
    id: "53647",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/449/1123330.jpg"
  },
]

const EmptyState: React.FC = () => {
  const emptyState = emptyStates[Math.floor(Math.random()*emptyStates.length)];

  return (
    <div className="notice-container empty-state stack">
      <p>{emptyState.description}</p>
      <div className="show-list">
      <ShowPreview id={emptyState.id} name={emptyState.name} image={emptyState.image} />
      </div>
    </div>
  );
};

export default EmptyState;
