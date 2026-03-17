export const artists = [
  { 
    name: "Pritam", 
    role: "Artist", 
    image: "/pritam.jpg",
    song: "/songs/Kyon_Barfi.mp3",
  },
  { 
    name: "Arijit Singh", 
    role: "Artist", 
    image: "/arjit.jpg",
    song: "/songs/Manwa_Laage.mp3",
  },
  { 
    name: "A.R. Rahman", 
    role: "Artist", 
    image: "/arrahman.jpg",
    song: "/songs/The_Humma_Song.mp3",
  },
  { 
    name: "Shankar Mahadevan", 
    role: "Artist", 
    image: "/shankar.jpg",
    song: "/songs/Sur_Niragas_Ho.mp3",
  },
  { 
    name: "Vishal-Shekhar", 
    role: "Artist", 
    image: "/vishalshekar.jpg",
    song: "/songs/Khuda_Jaane.mp3",
  },
];

export const albums = [
  {
    name: "Dhurandhar",
    role: "Arijit Singh Sachdev Muscial",
    image: "/Dhurandhar.jpg",
    song: "/songs/Gehra_Hua.mp3",
  },
  {
    name: "Aashiqui 2",
    role: "Mithoon, Ankit Tiwari",
    image: "/ashiqui2.jpg",
    song: "/songs/Tum_Hi_Ho.mp3",
  },
  {
    name: "Glory",
    role: "Yo Yo Honey Singh",
    image: "/glory.jpg",
    song: "/songs/Millionaire_Glory.mp3",
  },
  {
    name: "Yeh Jawaani Hai Deewani",
    role: "Pritam",
    image: "/yjhd.jpg",
    song: "/songs/Kabira.mp3",
  },
  {
    name: "Starboy",
    role: "The Weeknd",
    image: "/Starboy.jpg",
    song: "/songs/Weeknd_starboy.mp3",
  }
];

export const radios = [
  {
    name: "Arijit Singh Radio",
    role: "With Sachin-Jigar, Amit Trivedi,...",
    image: "/arijitradio.jpg",
    song: "/songs/Kesariya.mp3",
  },
  {
    name: "KK Radio",
    role: "With Arman Malik, Pritam, Ankit Tiwa...",
    image: "/kkradio.jpg",
    song: "/songs/Sach_Keh_Raha_Hai_Deewana.mp3",
  },
  {
    name: "Shreya Radio",
    role: "With A.R. Rahman, Vishal-Shekhar, A...",
    image: "/shreyaradio.jpg",
    song: "/songs/Mere_Dholna.mp3",
  },
  {
    name: "Diljit Radio",
    role: "With Karan Aujla, Shubh, Sidhu...",
    image: "/diljiradio.jpg",
    song: "/songs/Do_You_Know.mp3",
  },
  {
    name: "Kishore Radio",
    role: "With Mohammed Rafi, Mukesh, Tabassum...",
    image: "/kishoreradio.jpg",
    song: "/songs/Kishore_Kumar_Hit.mp3",
  },
];

export const charts = [
  {
    name: "Top songs - Global",
    role: "Your weekly update of the most played...",
    image: "/topGlobal.jpg",
    song: "/songs/Blinding_Lights.mp3",
  },
  {
    name: "Top songs - India",
    role: "Your weekly update of the most played...",
    image: "/topIndia.jpg",
    song: "/songs/Srivalli.mp3",
  },
  {
    name: "Top 50 - Global",
    role: "Your daily update of the most played...",
    image: "/top50global.jpg",
    song: "/songs/Espresso.mp3",
  },
  {
    name: "Top 50 - India",
    role: "Your daily update of the most played...",
    image: "/top50.jpg",
    song: "/songs/Bhool_Bhulaiyaa_2.mp3",
  },
  {
    name: "Viral 50 - Global",
    role: "Your daily update of the most viral...",
    image: "/viral50global.jpg",
    song: "/songs/Mann_Dhaavataya.mp3",
  },
];

export const mood = [
  {
    name: "Love Aaj Kal",
    role: "India's ultimate love playlist ❤️...",
    image: "/lak1.png",
    song: "/songs/Gehra_Hua.mp3",
  },
  {
    name: "Wedding Special",
    role: "Celebrate this day with your favorite...",
    image: "/lak2.png",
    song: "/songs/Khat_Navjot_Ahuja.mp3",
  },
  {
    name: "Romance",
    role: "Celebrating love!",
    image: "/lak3.png",
    song: "/songs/Chuttamalle.mp3",
  },
  {
    name: "Tamil Love",
    role: "Kondaduvom Kaadhal Thiruvizha!",
    image: "/lak4.png",
    song: "/songs/Yevarini_Adaganu.mp3",
  },
  {
    name: "Fallen",
    role: "Uff! you've fallen!",
    image: "/lak5.png",
    song: "/songs/Arcade_Duncan_Laurence.mp3",
  },
];

// Combine all songs for the music player
export const allSongs = [
  ...artists.map(item => ({
    title: item.name,
    artist: item.role,
    image: item.image,
    file: item.song
  })),
  ...albums.map(item => ({
    title: item.name,
    artist: item.role,
    image: item.image,
    file: item.song
  })),
  ...radios.map(item => ({
    title: item.name || "Radio",
    artist: item.role,
    image: item.image,
    file: item.song
  })),
  ...charts.map(item => ({
    title: item.name || "Chart",
    artist: item.role,
    image: item.image,
    file: item.song
  })),
  ...mood.map(item => ({
    title: item.name || "Mood",
    artist: item.role,
    image: item.image,
    file: item.song
  }))
].filter(song => song.file); // Only include songs with valid file paths