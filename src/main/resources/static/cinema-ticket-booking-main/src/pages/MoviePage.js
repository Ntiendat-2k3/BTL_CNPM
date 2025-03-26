import React from "react";
import MovieDetails from "../components/MovieDetails";
import MainLayout from "../layout/MainLayout";

const MoviePage = ({ match }) => {
  return (
    <MainLayout>
      <MovieDetails match={match} />
    </MainLayout>
  );
};

export default MoviePage;
