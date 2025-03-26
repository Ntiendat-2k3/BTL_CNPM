import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <Link to={`/movies/${movie.id}`}>
        <div className="relative">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        </div>
        <div className="p-6">
          <p className="text-xl font-semibold text-gray-900 truncate">
            {movie.title}
          </p>
          <p className="text-sm text-gray-500 mt-2">{movie.genre}</p>
          <p className="text-sm text-gray-400 mt-1">
            Release Year: {movie.releaseYear}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
