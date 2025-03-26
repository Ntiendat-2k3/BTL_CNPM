package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "SEAT")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seat_row", nullable = false)
    private String seatRow;

    @Column(name = "number", nullable = false)
    private int number;

    @Column(name = "status", nullable = false)
    private boolean status;

    @Column(name = "idroom", nullable = false) // Đảm bảo Hibernate hiểu đây là idroom
    private Long idroom;
}
