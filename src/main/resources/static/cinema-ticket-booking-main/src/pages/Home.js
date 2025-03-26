import React, { useEffect, useState } from "react";
import { getMovies } from "../api/movieApi"; // Nhập API helper
import MovieCard from "../components/MovieCard";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <MainLayout>
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl text-center mb-8 font-bold">
          🎬 Movie Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
