import { useState } from "react";
import Section from "../components/Section";
import { artists, albums, radios, charts, mood, allSongs } from "../data/musicData";
import Footer from "../components/Footer";

const MainContent = ({ setCurrentSong, currentSong }) => {
  const [currentSection, setCurrentSection] = useState(null);

  const handlePlaySong = (item) => {
    // Create a song object from the item
    const song = {
      title: item.name || item.title,
      artist: item.role || item.artist,
      image: item.image,
      file: item.song
    };
    
    setCurrentSong(song);
    setCurrentSection(item);
  };

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