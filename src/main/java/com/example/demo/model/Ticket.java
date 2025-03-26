package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "TICKET")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "idroom", nullable = false)
    private Integer idRoom;

    @Column(name = "idshowtime", nullable = false)
    private Integer idShowtime;

    @Column(name = "idseat", nullable = false)
    private Integer idSeat;

    @Column(name = "date", nullable = false)
    private LocalDate date;
}
