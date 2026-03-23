import { useState, useRef, useEffect } from "react";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { TbPlayerSkipForwardFilled, TbPlayerSkipBackFilled } from "react-icons/tb";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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
  {
    title: "Espresso",
    artist: "Sabrina Carpenter",
    image: "/cardphoto/espresso.jpg",
    file: "/songs/Espresso.mp3"
  },
];

export default function MusicPlayer({
  currentSong: propCurrentSong,
  setCurrentSong: propSetCurrentSong,
  playlist = []
}) {

  const [internalCurrentSong, setInternalCurrentSong] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const [volume, setVolume] = useState(0.4);
  const [prevVolume, setPrevVolume] = useState(0.4);
  const [muted, setMuted] = useState(false);

  const [usePlaylist, setUsePlaylist] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);

  const audioRef = useRef();

  // Load liked songs
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(stored);
  }, []);

  // Save liked songs
  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  // Detect card click
  useEffect(() => {
    if (propCurrentSong) {
      setUsePlaylist(true);
      setPlaying(true);
    }
  }, [propCurrentSong]);

  const songsList =
    usePlaylist && playlist.length > 0
      ? playlist
      : defaultSongs;

  const getCurrentSongIndex = () => {

    if (usePlaylist && propCurrentSong) {

      const index = playlist.findIndex(
        (song) => song.title === propCurrentSong.title
      );

      return index !== -1 ? index : 0;
    }

    return internalCurrentSong;
  };

  const currentSongIndex = getCurrentSongIndex();
  const currentSong = songsList[currentSongIndex];

  // Play / Pause
  useEffect(() => {

    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.play().catch(err => console.log(err));
    } else {
      audioRef.current.pause();
    }

  }, [playing]);

  // Song change
  useEffect(() => {

    if (!audioRef.current) return;

    audioRef.current.load();
    setProgress(0);

    if (playing) {
      audioRef.current.play().catch(err => console.log(err));
    }

  }, [currentSongIndex]);

  // Volume update
  useEffect(() => {

    if (audioRef.current) {
      audioRef.current.volume = volume;
    }

  }, [volume]);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const nextSong = () => {

    const nextIndex = (currentSongIndex + 1) % songsList.length;

    setInternalCurrentSong(nextIndex);

    if (usePlaylist && propSetCurrentSong) {
      propSetCurrentSong(songsList[nextIndex]);
    }

  };

  const prevSong = () => {

    const prevIndex =
      currentSongIndex === 0
        ? songsList.length - 1
        : currentSongIndex - 1;

    setInternalCurrentSong(prevIndex);

    if (usePlaylist && propSetCurrentSong) {
      propSetCurrentSong(songsList[prevIndex]);
    }

  };

  const updateProgress = () => {

    if (!audioRef.current) return;

    const duration = audioRef.current.duration;
    const current = audioRef.current.currentTime;

    if (!duration) return;

    setProgress((current / duration) * 100);

  };

  const changeProgress = (e) => {

    const value = e.target.value;

    if (audioRef.current) {

      audioRef.current.currentTime =
        (value / 100) * audioRef.current.duration;

      setProgress(value);
    }

  };

  // Volume slider
  const changeVolume = (e) => {

    const value = e.target.value;

    if (!audioRef.current) return;

    audioRef.current.volume = value;

    setVolume(value);

    if (value > 0) {
      audioRef.current.muted = false;
      setMuted(false);
    }

  };

  // Mute toggle
  const toggleMute = () => {

    if (!audioRef.current) return;

    if (!muted) {

      setPrevVolume(volume);

      audioRef.current.muted = true;
      audioRef.current.volume = 0;

      setVolume(0);
      setMuted(true);

    } else {

      audioRef.current.muted = false;
      audioRef.current.volume = prevVolume;

      setVolume(prevVolume);
      setMuted(false);

    }

  };

  const formatTime = (time) => {

    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;

  };

  const toggleLike = () => {

    const isLiked = likedSongs.includes(currentSong.title);

    if (isLiked) {
      setLikedSongs(likedSongs.filter(song => song !== currentSong.title));
    } else {
      setLikedSongs([...likedSongs, currentSong.title]);
    }

  };

  return (
    <div className="fixed bottom-0 w-full h-[90px] bg-black flex items-center justify-between px-4 text-white z-50">

      {/* LEFT */}
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

        <button
          onClick={toggleLike}
          className="ml-2 text-xl hover:scale-110 transition"
        >
          {likedSongs.includes(currentSong.title)
            ? <FaHeart className="text-green-500" />
            : <FaRegHeart className="text-gray-400" />
          }
        </button>

      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center w-[500px]">

        <div className="flex mb-2 items-center gap-7">

          <div className="relative group">
            <button onClick={prevSong}>
              <TbPlayerSkipBackFilled className="cursor-pointer w-5 h-5 hover:scale-110 transition" />
            </button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#212121] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
              Previous
            </span>
          </div>
          

          <div className="relative group">
            <button
              onClick={togglePlay}
              className="cursor-pointer text-xl bg-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 transition "
            >
              {playing
                ? <TbPlayerPauseFilled className="text-black" />
                  
                : <TbPlayerPlayFilled className="text-black" />
              } 
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#212121] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                {playing ? "Pause" : "Play"}
              </span>
            </button>
          </div>
          
          <div className="relative group">
            <button onClick={nextSong}>
              <TbPlayerSkipForwardFilled className="cursor-pointer w-5 h-5 hover:scale-110 transition" />
            </button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#212121] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
              Next
            </span>
          
          </div>  
         

        </div>

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

      {/* RIGHT */}
      <div className="flex items-center  w-[200px] justify-end">
        
        <div className="relative group">
          <img
              src={muted ? "/mutelogo.png" : "/volume.png"}
              width={34}
              height={34}
              alt="volume"
              onClick={toggleMute}
              className="cursor-pointer"
          />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#212121] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                {muted ? "Unmute" : "Mute"}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
          className="progress-bar w-[120px]"
          style={{ "--progress": `${volume * 100}%` }}
        >
          
        </input>

      </div>

      <audio
        ref={audioRef}
        src={currentSong.file}
        onTimeUpdate={updateProgress}
        onEnded={nextSong}
      />

    </div>
  );
}