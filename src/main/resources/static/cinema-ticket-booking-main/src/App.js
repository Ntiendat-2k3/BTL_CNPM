import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import SearchFilm from "./pages/SearchFilm";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/search" element={<SearchFilm />} />
      </Routes>
    </Router>
  );
};

export default App;
