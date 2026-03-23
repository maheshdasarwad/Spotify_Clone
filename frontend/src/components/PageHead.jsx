import React, { useState, useEffect, useRef } from 'react';
import { GrHomeRounded } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { allSongs } from "../data/musicData";

const PageHead = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  // Get unique songs for suggestions
  const getSuggestions = (input) => {
    if (!input.trim()) return [];
    
    const uniqueSongs = [];
    const songMap = new Map();
    
    // Get unique songs from allSongs
    allSongs.forEach(song => {
      if (!songMap.has(song.title)) {
        songMap.set(song.title, song);
      }
    });
    
    const uniqueSongList = Array.from(songMap.values());
    
    // Filter suggestions
    const filtered = uniqueSongList.filter(song => 
      song.title.toLowerCase().includes(input.toLowerCase()) ||
      song.artist.toLowerCase().includes(input.toLowerCase())
    );
    
    return filtered.slice(0, 5); // Limit to 5 suggestions
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      const suggestionsList = getSuggestions(value);
      setSuggestions(suggestionsList);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, true);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        // Select suggestion
        setQuery(suggestions[selectedIndex].title);
        onSearch(suggestions[selectedIndex].title, true);
        setShowSuggestions(false);
      } else {
        // Regular search
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (song) => {
    setQuery(song.title);
    onSearch(song.title, true);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-black fixed w-full h-14 flex items-center p-8 z-50">

      {/* Logo */}
      <div>
        <img title='spotify' src="./assets/logo2.png" height="50" width="50" alt="logo" />
      </div>
    
      {/* Home Icon */}
      <div className="bg-[#232323] relative group ml-10 -mr-20 p-3 rounded-full
                      flex items-center justify-center cursor-pointer
                      hover:bg-[#2a2a2a] transition-colors">
        <a href='/'>
          <GrHomeRounded 
            className="text-gray-300 text-2xl group-hover:text-white transition-colors"
          />
        </a>

        <span className="absolute top-10 left-1/2 -translate-x-1/2 
                          bg-[#212121] text-white text-xs px-2 py-1 rounded
                          opacity-0 group-hover:opacity-100 transition">
            Home
        </span>
      </div>

      {/* SEARCH BAR with Suggestions */}
      <div className="relative w-86 ml-24" ref={searchRef}>
        <div className="relative">
          {/* Search Icon */}
          <div onClick={handleSearch} className="absolute left-3 top-1/2 -translate-y-1/2 group cursor-pointer">
          <img src="/search.png" className="w-6 h-6 opacity-70"/>

          <span className="absolute top-10 left-1/2 -translate-x-1/2 
                          bg-[#212121] text-white text-xs px-2 py-1 rounded
                          opacity-0 group-hover:opacity-100">
            Search
          </span>
        </div>

          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim() && setShowSuggestions(true)}
            placeholder="What do you want to play?"
            className="bg-[#232323] rounded-full h-11 w-full pl-10 pr-16
                      font-medium text-white border-none outline-none
                      placeholder:text-gray-400 focus:ring-2 focus:ring-white
                      transition-all duration-200"
          />

          {/* Divider */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 h-6 w-[1px] bg-gray-500"></div>

          {/* Browse Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 group cursor-pointer">
            <img src="/browser.png" className="w-7 h-7" />

            <span className="absolute top-10 left-1/2 -translate-x-1/2 
                            bg-[#212121] text-white text-xs px-2 py-1 rounded
                            opacity-0 group-hover:opacity-100">
              Browse
            </span>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#282828] rounded-md shadow-xl z-50 overflow-hidden">
            {suggestions.map((song, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(song)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition
                          ${selectedIndex === index ? 'bg-[#3a3a3a]' : 'hover:bg-[#3a3a3a]'}`}
              >
                <img 
                  src={song.image} 
                  alt={song.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{song.title}</p>
                  <p className="text-gray-400 text-xs">{song.artist}</p>
                </div>
                <IoSearchOutline className="text-gray-400 w-4 h-4" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex ml-16 mt-1">
        <a href="#" className="text-gray-400 px-1.5 font-bold hover:text-white transition">Premium</a>
        <a href="#" className="text-gray-400 px-1.5 font-bold hover:text-white transition">Support</a>
        <a href="#" className="text-gray-400 px-1.5 font-bold hover:text-white transition">Download</a>
      </div>

      {/* Divider */}
      <div className="-ml-6 mt-1">
        <img src="line.png" className="h-6 w-20" alt="divider" />
      </div>

      {/* Install */}
      <div className="text-gray-400 pl-8
                     bg-[url('download.png')] bg-no-repeat bg-[length:30px_30px] bg-left">
        <a href="#" className="font-semibold hover:text-white hover:underline">Install App</a>
      </div>

      {/* Auth */}
      <div className="flex items-center ml-auto gap-4 flex-shrink-0">
        <a href="#" className="text-gray-400 font-bold text-sm hover:text-white transition whitespace-nowrap">Sign up</a>
        <button className="text-black h-10 px-6 bg-white rounded-full hover:scale-105 transition font-semibold text-sm">
          Log in
        </button>
      </div>
    </div>
  );
};

export default PageHead;