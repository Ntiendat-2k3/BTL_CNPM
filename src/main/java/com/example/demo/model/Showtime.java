package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "SHOWTIME")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "idmovie") // Đảm bảo tên cột khớp với DB
    private Long idmovie;

    @Column(name = "idroom")
    private Long idroom;

    private String time;
}
