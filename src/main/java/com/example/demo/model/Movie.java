package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "MOVIE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String genre;
    private Integer releaseYear;
    private String description; // 🆕 Thêm mô tả phim
    private String imageUrl;    // 🆕 Thêm URL hình ảnh
}
