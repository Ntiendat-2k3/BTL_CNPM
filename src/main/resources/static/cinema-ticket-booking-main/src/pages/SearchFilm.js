import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import MainLayout from "../layout/MainLayout";

const SearchFilm = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allMovies, setAllMovies] = useState([]);

  // Load toàn bộ phim một lần
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovies();
        setAllMovies(data);
      } catch (error) {
        console.error("Lỗi tải phim:", error);
      }
    };
    loadMovies();
  }, []);

  // Filter client-side
  useEffect(() => {
    if (query && allMovies.length) {
      const lowerQuery = query.toLowerCase().trim();
      const filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(lowerQuery)
      );
      setResults(filtered);
      setIsLoading(false);
    }
  }, [query, allMovies]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Kết quả tìm kiếm cho: "{query}"
        </h1>

        {isLoading ? (
          <div className="text-center">Đang tải kết quả...</div>
        ) : results.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            Không tìm thấy phim nào phù hợp
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SearchFilm;
