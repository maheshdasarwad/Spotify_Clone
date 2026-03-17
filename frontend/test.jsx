import { useState, useRef, useEffect } from "react";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { TbPlayerSkipForwardFilled, TbPlayerSkipBackFilled } from "react-icons/tb";

const defaultSongs = [
  {
    title: "Sirivennela",
    artist: "Anurag Kulkarni, Mickey J Meyer",
    image: "/ssr.jpg",
    file: "/songs/Sirivennela.mp3"
  },
  {
    title: "Laal Ishq",
    artist: "Arijit Singh",
    image: "/arjit.jpg",
    file: "/songs/Laal_Ishq.mp3"
  },
];

export default function MusicPlayer({ currentSong: propCurrentSong, setCurrentSong: propSetCurrentSong, playlist = [] }) {
  // Use propCurrentSong if provided, otherwise use default song
  const [internalCurrentSong, setInternalCurrentSong] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef();

  // Determine which song to play
  const getCurrentSongIndex = () => {
    if (propCurrentSong) {
      // If we have a song from props, find its index in the appropriate playlist
      const songsList = playlist.length > 0 ? playlist : defaultSongs;
      const index = songsList.findIndex(s => s.title === propCurrentSong.title);
      return index !== -1 ? index : 0;
    }
    return internalCurrentSong;
  };

  const currentSongIndex = getCurrentSongIndex();
  
  // Get the appropriate songs list
  const getSongsList = () => {
    if (playlist.length > 0) return playlist;
    return defaultSongs;
  };

  const songsList = getSongsList();
  const currentSong = songsList[currentSongIndex] || songsList[0];

  // Handles play/pause toggle only
  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(err => console.log("Play failed:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  // Handles song change — reload audio, reset progress, then play if active
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setProgress(0);
      if (playing) {
        audioRef.current.play().catch(err => console.log("Play failed:", err));
      }
    }
  }, [currentSongIndex, currentSong]);

  // Set default volume on mount and when volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update internal index when prop changes
  useEffect(() => {
    if (propCurrentSong) {
      const index = songsList.findIndex(s => s.title === propCurrentSong.title);
      if (index !== -1) {
        setInternalCurrentSong(index);
      }
    }
  }, [propCurrentSong]);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songsList.length;
    setInternalCurrentSong(nextIndex);
    
    // Update parent if function provided
    if (propSetCurrentSong) {
      propSetCurrentSong(songsList[nextIndex]);
    }
    
    if (!playing) {
      setPlaying(true);
    }
  };

  const prevSong = () => {
    const prevIndex = currentSongIndex === 0 ? songsList.length - 1 : currentSongIndex - 1;
    setInternalCurrentSong(prevIndex);
    
    // Update parent if function provided
    if (propSetCurrentSong) {
      propSetCurrentSong(songsList[prevIndex]);
    }
    
    if (!playing) {
      setPlaying(true);
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const current = audioRef.current.currentTime;

      if (!duration) return;

      setProgress((current / duration) * 100);
    }
  };

  const changeProgress = (e) => {
    const value = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
      setProgress(value);
    }
  };

  const changeVolume = (e) => {
    const value = e.target.value;
    audioRef.current.volume = value;
    setVolume(value);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 w-full h-[90px] bg-black flex items-center justify-between px-4 text-white z-50">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 w-[300px]">
        <img
          src={currentSong.image}
          className="w-[55px] h-[55px] rounded object-cover"
          alt={currentSong.title}
        />

        <div>
          <h4 className="text-sm font-semibold">{currentSong.title}</h4>
          <p className="text-xs text-gray-400">{currentSong.artist}</p>
        </div>
      </div>

      {/* CENTER PLAYER */}
      <div className="flex flex-col items-center w-[500px]">
        <div className="flex mb-2 items-center gap-6">
          <button onClick={prevSong}>
            <TbPlayerSkipBackFilled className="cursor-pointer w-5 h-5 hover:scale-110 transition" />
          </button>

          <button
            onClick={togglePlay}
            className="absolute bottom-2 right-2 text-2xl bg-green-500 rounded-full w-10 h-10 cursor-pointer
                       flex items-center justify-center 
                       opacity-0 translate-y-2 group-hover:opacity-100 
                     group-hover:translate-y-0 transition-all duration-300
                     hover:scale-105 hover:bg-green-400"
          >
            {playing
              ? <TbPlayerPauseFilled className="text-black" />
              : <TbPlayerPlayFilled className="text-black" />
            }
          </button>

          <button onClick={nextSong}>
            <TbPlayerSkipForwardFilled className="cursor-pointer w-5 h-5 hover:scale-110 transition" />
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-xs text-gray-400">
            {formatTime(audioRef.current?.currentTime)}
          </span>

        <input
  type="range"
  value={progress}
  onChange={changeProgress}
  className="progress-bar w-full"
  style={{ "--progress": `${progress}%` }}
/>

          <span className="text-xs text-gray-400">
            {formatTime(audioRef.current?.duration)}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
     <div className="flex items-center gap-2 w-[200px] justify-end">

        <img
          src="volume.png"
          className="controls-icons-img"
          alt="volume"
          width="35"
          height="35"
        />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
          className="progress-bar w-[120px]"
          style={{ "--progress": `${volume * 100}%` }}
        />
      </div>

      {/* AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        src={currentSong.file}
        onTimeUpdate={updateProgress}
        onEnded={nextSong}
      />
    </div>
  );
}