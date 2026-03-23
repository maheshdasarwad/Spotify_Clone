import React from 'react';
import { TbPlayerPlayFilled } from "react-icons/tb";

const Card = ({ image, title, subtitle, round, onPlay, isPlaying, searchQuery = "" }) => {
  
  // Function to highlight search term in text
  const highlightText = (text, query) => {
    if (!query || !text || !query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-green-500 text-white px-0.5 rounded">{part}</mark> : 
        part
    );
  };

  return (
    <div className="p-4 rounded-lg hover:bg-[#282828] transition group relative">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className={`w-full aspect-square object-cover 
            ${round ? "rounded-full" : "rounded-md"}`}
        />

        {/* PLAY BUTTON - Spotify style */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          className="absolute bottom-1 right-1 text-2xl bg-green-500 rounded-full w-12 h-12 cursor-pointer
                        flex items-center justify-center 
                        opacity-0 translate-y-2 group-hover:opacity-100 
                      group-hover:translate-y-0 transition-all duration-300
                      hover:scale-105 hover:bg-green-400"
          >
          <TbPlayerPlayFilled className="text-black" />
        </button>

        {/* Now playing indicator */}
        {isPlaying && (
          <div className="absolute top-2 left-2 bg-green-500 rounded-full w-3 h-3 animate-pulse"></div>
        )}
      </div>

      {/* Title with highlight */}
      <p className="font-semibold mt-3 text-white truncate">
        {searchQuery ? highlightText(title, searchQuery) : title}
      </p>
      
      {/* Subtitle with highlight */}
      <p className="text-sm text-gray-400 truncate">
        {searchQuery ? highlightText(subtitle, searchQuery) : subtitle}
      </p>
    </div>
  );
};

export default Card;