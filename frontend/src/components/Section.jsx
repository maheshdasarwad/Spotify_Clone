import { useState } from "react";
import Card from "./Card";

const Section = ({ title, items, round, onPlaySong, currentSong, searchQuery = "" }) => {
  const INITIAL_COUNT = 5;
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, INITIAL_COUNT);

  // Don't show section if no items
  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-white">{title}</h2>

        {items.length > INITIAL_COUNT && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-gray-400 hover:text-white hover:underline transition"
          >
            {expanded ? "Show less" : "Show all"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visibleItems.map((item, index) => (
          <Card
            key={index}
            image={item.image}
            title={item.name || item.title}
            subtitle={item.role || item.artist}
            round={round}
            isPlaying={currentSong?.title === (item.name || item.title)}
            onPlay={() => onPlaySong(item)}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;