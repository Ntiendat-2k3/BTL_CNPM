package com.example.demo.repository;

import com.example.demo.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByIdRoomAndIdShowtime(Integer idRoom, Integer idShowtime);
    boolean existsByIdRoomAndIdShowtimeAndIdSeat(Integer idRoom, Integer idShowtime, Integer idSeat);
}
