package com.example.demo.repository;

import com.example.demo.model.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    List<Showtime> findByIdmovie(Long idmovie); // 🔹 Đổi phương thức thành đúng cú pháp JPA
}
