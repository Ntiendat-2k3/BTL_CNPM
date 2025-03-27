import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import MainLayout from "../layout/MainLayout";

const SearchFilm = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        setIsLoading(true);
        try {
          const data = await searchMovies(query);
          setResults(data);
        } catch (error) {
          console.error("Lỗi tìm kiếm:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchResults();
  }, [query]);

  return (
    <MainLayout>
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
            Kết quả tìm kiếm cho: "{query}"
        </h1>

        {isLoading ? (
            <div className="text-center">Đang tải kết quả...</div>
        ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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