package com.example.demo.controller;

import com.example.demo.model.Movie;
import com.example.demo.model.Showtime;
import com.example.demo.repository.MovieRepository;
import com.example.demo.repository.ShowtimeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MovieController {
    private final MovieRepository movieRepository;
    private final ShowtimeRepository showtimeRepository;

    public MovieController(MovieRepository movieRepository, ShowtimeRepository showtimeRepository) {
        this.movieRepository = movieRepository;
        this.showtimeRepository = showtimeRepository;
    }

    // API lấy danh sách phim (trả về cả hình ảnh và mô tả)
    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        System.out.println("🔥 API /api/movies được gọi!");
        return movieRepository.findAll();
    }

    // API lấy thông tin phim theo id (bao gồm hình ảnh và mô tả)
    @GetMapping("/movies/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Optional<Movie> movie = movieRepository.findById(id);
        return movie.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // API lấy danh sách suất chiếu theo id phim
    @GetMapping("/movies/{idmovie}/showtimes")
    public ResponseEntity<List<Showtime>> getShowtimesByMovie(@PathVariable Long idmovie) {
        List<Showtime> showtimes = showtimeRepository.findByIdmovie(idmovie);
        if (showtimes.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(showtimes);
    }
}
