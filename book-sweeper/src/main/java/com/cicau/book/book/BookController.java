package com.cicau.book.book;

import com.cicau.book.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Tag(name = "Book")
public class BookController {

    private final BookService bookService;

    @PostMapping("books")
    public ResponseEntity<Long> saveBook(@RequestBody @Valid BookRequest request, Authentication connectedUser) {
        return ResponseEntity.ok(bookService.save(request, connectedUser));
    }

    @GetMapping("books/{bookId}")
    public ResponseEntity<BookResponse> findBookById(@PathVariable("bookId") Long id) {
        return ResponseEntity.ok(bookService.findById(id));
    }

    @GetMapping("books")
    public ResponseEntity<PageResponse<BookResponse>> findAllBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "20", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.findAll(page, size, connectedUser));
    }

    @GetMapping("/user/books")
    public ResponseEntity<PageResponse<BookResponse>> findAllBooksByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "20", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.findAllByOwner(page, size, connectedUser));
    }

    @GetMapping("/user/books/borrowed")
    public ResponseEntity<PageResponse<BorrowedBookResponse>> findAllBorrowedBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "20", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.findAllBorrowedBooks(page, size, connectedUser));
    }

    @GetMapping("/user/books/returned")
    public ResponseEntity<PageResponse<BorrowedBookResponse>> findAllReturnedBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "20", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.findAllReturnedBooks(page, size, connectedUser));
    }

    @PatchMapping("books/shareable/{bookId}")
    public ResponseEntity<Long> updateShareableAttribute(
            @PathVariable("bookId") Long id,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.updateShareableAttribute(id, connectedUser));
    }

    @PatchMapping("books/archived/{bookId}")
    public ResponseEntity<Long> updateArchivedAttribute(
            @PathVariable("bookId") Long id,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.updateArchivedAttribute(id, connectedUser));
    }

    @PostMapping("books/borrow/{bookId}")
    public ResponseEntity<Long> borrowBook(
            @PathVariable("bookId") Long id,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.borrowBook(id, connectedUser));
    }

    @PatchMapping("books/return/{bookId}")
    public ResponseEntity<Long> returnBook(
            @PathVariable("bookId") Long id,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.returnBook(id, connectedUser));
    }

    @PatchMapping("books/return/approve/{bookId}")
    public ResponseEntity<Long> approveReturnedBook(
            @PathVariable("bookId") Long id,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.approveReturnedBook(id, connectedUser));
    }

    @PostMapping(value = "books/cover/upload/{bookId}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadBookCover(
            @PathVariable("bookId") Long id,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ) {
        bookService.uploadBookCover(id, file, connectedUser);
        return ResponseEntity.accepted().build();
    }
}
