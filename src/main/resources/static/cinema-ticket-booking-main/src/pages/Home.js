import React, { useEffect, useState } from "react";
import { getMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import MainLayout from "../layout/MainLayout";
import LoadingHamster from '../utils/LoadingHamster';
import LoadingSkeleton from '../utils/LoadingSkeleton'; 

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

  // if (loading) return (
  //   <div className="flex justify-center items-center h-screen">
  //     <LoadingHamster />
  //   </div>
  // );

  return (
    <MainLayout>
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl text-center mb-8 font-bold">
          🎬 Movie Gallery
        </h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8">
          {loading ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
