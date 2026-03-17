import React, { useState } from 'react'
import PageHead from '../components/pageHead'
import PageSidebar from '../components/PageSidebar'
import MusicPlayer from '../components/MusicPlayer'
import { allSongs } from "../data/musicData.js";
import MainContent from './MainContent.jsx';



const Home = ({ playSong })  => {
     const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className='flex'>
      <PageHead />
      <PageSidebar />

      <MainContent
          currentSong={currentSong} 
          setCurrentSong={setCurrentSong} 
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



