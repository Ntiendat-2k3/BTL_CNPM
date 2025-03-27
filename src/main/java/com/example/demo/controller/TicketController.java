package com.example.demo.controller;

import com.example.demo.model.Ticket;
import com.example.demo.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    // 🛒 API MUA VÉ
    @PostMapping("/buy")
    public ResponseEntity<?> buyTickets(@RequestBody List<Ticket> tickets) {
        for (Ticket ticket : tickets) {
            boolean isBooked = ticketRepository.existsByIdRoomAndIdShowtimeAndIdSeat(
                    ticket.getIdRoom(),
                    ticket.getIdShowtime(),
                    ticket.getIdSeat()
            );

            if (isBooked) {
                return ResponseEntity.badRequest().body("{\"success\": false, \"message\": \"Ghế đã được đặt!\"}");
            }
        }

        ticketRepository.saveAll(tickets);

        return ResponseEntity.ok().body("{\"success\": true, \"message\": \"Đặt vé thành công!\"}");
    }



    // ✅ API LẤY DANH SÁCH VÉ
    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketRepository.findAll());
    }

    // ✅ API LẤY GHẾ ĐÃ ĐẶT
    @GetMapping("/booked")
    public ResponseEntity<List<Ticket>> getBookedSeats(
            @RequestParam("idRoom") Integer idRoom,
            @RequestParam("idShowtime") Integer idShowtime
    ) {
        List<Ticket> bookedSeats = ticketRepository.findByIdRoomAndIdShowtime(idRoom, idShowtime);
        return ResponseEntity.ok(bookedSeats);
    }

    // @GetMapping("/sales")
    // public ResponseEntity<List<TicketSaleDTO>> getTicketSales() {
    //     return ResponseEntity.ok(ticketRepository.getTicketSales());
    // }
}
