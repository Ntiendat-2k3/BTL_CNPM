package com.example.demo.controller;

import com.example.demo.model.Seat;
import com.example.demo.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    @Autowired
    private SeatRepository seatRepository;

    // Lấy danh sách tất cả ghế
    @GetMapping
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    // Lấy danh sách ghế theo phòng
    @GetMapping("/room/{idroom}")
    public List<Seat> getSeatsByRoom(@PathVariable Long idroom) {
        return seatRepository.findByIdroom(idroom);
    }

    // Lấy ghế theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Seat> getSeatById(@PathVariable Long id) {
        Optional<Seat> seat = seatRepository.findById(id);
        return seat.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo ghế mới
    @PostMapping
    public Seat createSeat(@RequestBody Seat seat) {
        return seatRepository.save(seat);
    }

    // Cập nhật trạng thái ghế
    @PutMapping("/{id}/status")
    public ResponseEntity<Seat> updateSeatStatus(@PathVariable Long id, @RequestParam boolean status) {
        return seatRepository.findById(id)
                .map(seat -> {
                    seat.setStatus(status);
                    return ResponseEntity.ok(seatRepository.save(seat));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Xóa ghế
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeat(@PathVariable Long id) {
        if (seatRepository.existsById(id)) {
            seatRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
