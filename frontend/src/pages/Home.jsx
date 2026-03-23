import React, { useState } from 'react'
import PageHead from '../components/pageHead'
import PageSidebar from '../components/PageSidebar'
import MusicPlayer from '../components/MusicPlayer'
import { allSongs } from "../data/musicData.js";
import MainContent from './MainContent.jsx';

const Home = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (value, shouldShowResults) => {
    setSearchQuery(value);
    setShowSearchResults(shouldShowResults);
  };

  return (
    <div className='flex '>
      <PageHead onSearch={handleSearch} />
      <PageSidebar />
      <MainContent
        currentSong={currentSong} 
        setCurrentSong={setCurrentSong}
        searchQuery={searchQuery}
        showSearchResults={showSearchResults}
      />
      
      <MusicPlayer 
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        playlist={allSongs}
      />
    </div>
  )
}

export default Home