import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/outline";
import { getMovies } from "../api/movieApi";
import debounce from "lodash.debounce";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LazyImage from "./LazyImage";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const searchMovies = useCallback((query, movies) => {
    const lowerQuery = query.toLowerCase().trim();
    return movies.filter(movie => 
      movie.title?.toLowerCase().includes(lowerQuery)
    );
  }, []);

  const debouncedSearch = useMemo(() => 
    debounce((query, movies) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setSuggestions(searchMovies(query, movies));
    }, 300)
  , [searchMovies]);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getMovies();
        setAllMovies(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadMovies();
  }, []);

  useEffect(() => {
    if (searchQuery && allMovies.length) {
      debouncedSearch(searchQuery, allMovies);
    }
    return () => debouncedSearch.cancel();
  }, [searchQuery, allMovies, debouncedSearch]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery("");
    }
  }, [searchQuery, navigate]);

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Tìm phim..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 placeholder-gray-400"
          aria-label="Search movies"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          aria-label="Search button"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      </form>

      {searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton width={60} height={90} />
                  <div className="flex-1">
                    <Skeleton count={2} />
                  </div>
                </div>
              ))}
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((movie) => (
              <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                className="flex items-center p-3 hover:bg-gray-50 text-gray-800 no-underline border-b last:border-0 transition-colors gap-3"
                onClick={() => setSearchQuery("")}
              >
                <LazyImage
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-15 h-20 object-cover rounded-md flex-shrink-0"
                  width={60}
                  height={70}
                  placeholderClass="rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate text-base">{movie.title}</div>
                  <div className="text-sm text-gray-600 truncate">
                    {movie.genre}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {movie.releaseYear}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-gray-500">Không tìm thấy phim phù hợp</div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchBar);