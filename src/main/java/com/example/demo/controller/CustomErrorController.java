package com.example.demo.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;


@RestController
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<String> handleError(HttpServletRequest request) {
        // Lấy mã lỗi HTTP từ request
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");

        if (statusCode == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi không xác định!");
        }

        switch (statusCode) {
            case 404:
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy tài nguyên!");
            case 500:
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi máy chủ nội bộ!");
            default:
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã xảy ra lỗi!");
        }
    }

    // Ghi đè phương thức getErrorPath (Chỉ cần với Spring Boot 2, phiên bản mới không cần)
    public String getErrorPath() {
        return "/error";
    }
}
