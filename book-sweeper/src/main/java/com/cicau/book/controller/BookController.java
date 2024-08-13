package com.cicau.book.controller;

import com.cicau.book.dtos.BookRequest;
import com.cicau.book.dtos.BookResponse;
import com.cicau.book.service.BookService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("books")
@RequiredArgsConstructor
@Tag(name = "Book")
public class BookController {

    private final BookService bookService;

    @PostMapping
    public ResponseEntity<Long> saveBook(@RequestBody @Valid BookRequest request, Authentication connectedUser) {
        return ResponseEntity.ok(bookService.save(request, connectedUser));
    }

    @GetMapping("{bookId}")
    public ResponseEntity<BookResponse> findBookById(@PathVariable("bookId") Long id) {
        return ResponseEntity.ok(bookService.findById(id));
    }
}
