import { useState, useMemo } from "react";
import Section from "../components/Section";
import { artists, albums, radios, charts, mood, allSongs } from "../data/musicData";
import Footer from "../components/Footer";
import { TbPlayerPlayFilled } from "react-icons/tb";


const MainContent = ({ setCurrentSong, currentSong, searchQuery, showSearchResults }) => {
  const [currentSection, setCurrentSection] = useState(null);

  // Get unique songs for search results
  const getSearchResults = () => {
    if (!searchQuery || !searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const uniqueSongs = [];
    const songMap = new Map();
    
    // Get unique songs from allSongs
    allSongs.forEach(song => {
      if (!songMap.has(song.title)) {
        songMap.set(song.title, song);
      }
    });
    
    const uniqueSongList = Array.from(songMap.values());
    
    // Filter songs based on search query
    return uniqueSongList.filter(song => 
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );
  };

  const searchResults = getSearchResults();

  const handlePlaySong = (item) => {
    const song = {
      title: item.name || item.title,
      artist: item.role || item.artist,
      image: item.image,
      file: item.song
    };
    
    setCurrentSong(song);
    setCurrentSection(item);
  };

  // Convert search results to card format
  const formatSearchResults = () => {
    return searchResults.map(song => ({
      name: song.title,
      role: song.artist,
      image: song.image,
      song: song.file
    }));
  };

  // Show search results view when search is active
  if (showSearchResults && searchQuery && searchQuery.trim()) {
    const formattedResults = formatSearchResults();
    
    return (
    <div className="flex-1 bg-gradient-to-b from-[#1f1f1f] to-[#121212] rounded-xl mt-17 ml-2 mr-2
                    overflow-auto mb-24 p-6 text-white hide-scrollbar h-118 ]">

        {/* Search Header */}
        <div >
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-400">
            {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchQuery}"
          </p>
        </div>

        {/* Search Results Grid */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {formattedResults.map((item, index) => (
              <div key={index} className="p-4 rounded-lg hover:bg-[#282828] transition group relative">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                  <button
                    onClick={() => handlePlaySong(item)}
                    className="absolute bottom-1 right-1 text-2xl bg-green-500 rounded-full w-12 h-12 cursor-pointer
                                  flex items-center justify-center 
                                  opacity-0 translate-y-2 group-hover:opacity-100 
                                group-hover:translate-y-0 transition-all duration-300
                                hover:scale-105 hover:bg-green-400"
                    >
                    <TbPlayerPlayFilled className="text-black" />
                  </button>
                </div>
                <p className="font-semibold mt-3 text-white truncate">{item.name}</p>
                <p className="text-sm text-gray-400 truncate">{item.role}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <svg className="w-24 h-24 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-gray-400 text-center">
              We couldn't find any matches for "{searchQuery}".<br />
              Try different keywords or check your spelling.
            </p>
          </div>
        )}
        
        <Footer />
      </div>
    );
  }

  // Normal view (no search)
  return (
      <div className="flex-1 bg-gradient-to-b from-[#1f1f1f] to-[#121212] rounded-xl mt-17 ml-2 mr-2
                    overflow-auto mb-24 p-6 text-white hide-scrollbar h-118 ]">

      <Section
        title="Popular artists"
        items={artists}
        round={true}
        onPlaySong={handlePlaySong}
        currentSong={currentSong}
      />

      <Section
        title="Popular albums and singles"
        items={albums}
        onPlaySong={handlePlaySong}
        currentSong={currentSong}
      />

      <Section
        title="Popular radio"
        items={radios}
        onPlaySong={handlePlaySong}
        currentSong={currentSong}
      />

      <Section
        title="Featured Charts"
        items={charts}
        onPlaySong={handlePlaySong}
        currentSong={currentSong}
      />

      <Section
        title="Love Aaj Kal"
        items={mood}
        onPlaySong={handlePlaySong}
        currentSong={currentSong}
      />

      <Footer />
    </div>
  );
};

export default MainContent;