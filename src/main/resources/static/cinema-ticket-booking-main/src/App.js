import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import SearchFilm from "./pages/SearchFilm";
import AdminLayout from "./layout/AdminLayout";
import {
  Dashboard,
  ManageAccounts,
  ManageMovies,
  ManageShowtimes,
  ManageTickets,
} from "./pages/admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/search" element={<SearchFilm />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<ManageAccounts />} />
          <Route path="movies" element={<ManageMovies />} />
          <Route path="showtimes" element={<ManageShowtimes />} />
          <Route path="tickets" element={<ManageTickets />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
