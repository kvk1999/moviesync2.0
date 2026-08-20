// TMDB & High Quality Curated Movie Data Provider

const MOCK_MOVIES = [
  {
    id: 101,
    title: "Interstellar: Beyond Time",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    overview: "When Earth becomes uninhabitable in the near future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    rating: 8.7,
    releaseYear: 2014,
    runtime: "2h 49m",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    bannerUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop",
    posterUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
  },
  {
    id: 102,
    title: "Cyberpunk 2099: Neon Horizon",
    tagline: "In the shadow of megastructures, truth is the ultimate currency.",
    overview: "A rogue synthetic detective in Neo-Tokyo uncovers a conspiratorial threat that blurs the boundaries between human consciousness and artificial intelligence.",
    rating: 8.4,
    releaseYear: 2024,
    runtime: "2h 15m",
    genre: ["Action", "Sci-Fi", "Thriller"],
    bannerUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    cast: ["Keanu Reeves", "Ana de Armas", "Hiroyuki Sanada"]
  },
  {
    id: 103,
    title: "The Deep Ocean Odyssey",
    tagline: "Some depths are not meant to be explored alone.",
    overview: "Deep sea marine biologists stationed in the Mariana Trench discover an ancient bioluminescent civilization beneath the earth's crust.",
    rating: 8.1,
    releaseYear: 2023,
    runtime: "1h 58m",
    genre: ["Adventure", "Mystery", "Sci-Fi"],
    bannerUrl: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1600&auto=format&fit=crop",
    posterUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    cast: ["Sigourney Weaver", "Pedro Pascal", "Gemma Chan"]
  },
  {
    id: 104,
    title: "Dune: Prophecy of Arrakis",
    tagline: "Fear is the mind-killer.",
    overview: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while escaping betrayal on a desert planet.",
    rating: 8.9,
    releaseYear: 2024,
    runtime: "2h 46m",
    genre: ["Action", "Sci-Fi", "Drama"],
    bannerUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"]
  },
  {
    id: 105,
    title: "Velocity: Midnight Drift",
    tagline: "Speed is a state of mind.",
    overview: "Underground street racers team up with federal agents to take down an international syndicate operating in European capitals.",
    rating: 7.8,
    releaseYear: 2023,
    runtime: "2h 05m",
    genre: ["Action", "Crime", "Thriller"],
    bannerUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1600&auto=format&fit=crop",
    posterUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    cast: ["Vin Diesel", "Paul Walker", "Michelle Rodriguez"]
  },
  {
    id: 106,
    title: "Chronos Paradox",
    tagline: "Yesterday is tomorrow.",
    overview: "A quantum physicist accidentally opens a localized time loop, forcing her to outsmart future iterations of herself to prevent catastrophe.",
    rating: 8.5,
    releaseYear: 2025,
    runtime: "1h 52m",
    genre: ["Sci-Fi", "Mystery", "Thriller"],
    bannerUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    cast: ["Florence Pugh", "Cillian Murphy", "John David Washington"]
  }
];

export const getFeaturedMovie = () => MOCK_MOVIES[0];

export const getTrendingMovies = () => MOCK_MOVIES;

export const searchMovies = (query) => {
  if (!query) return MOCK_MOVIES;
  const q = query.toLowerCase();
  return MOCK_MOVIES.filter(m => 
    m.title.toLowerCase().includes(q) || 
    m.genre.some(g => g.toLowerCase().includes(q)) ||
    m.overview.toLowerCase().includes(q)
  );
};

export const getMovieById = (id) => {
  return MOCK_MOVIES.find(m => m.id === Number(id)) || MOCK_MOVIES[0];
};
