package com.cicau.book.service;

import com.cicau.book.dtos.BookRequest;
import com.cicau.book.dtos.BookResponse;
import com.cicau.book.dtos.PageResponse;
import com.cicau.book.entity.Book;
import com.cicau.book.entity.User;
import com.cicau.book.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public Long save(BookRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Book book = bookMapper.toBook(request);
        book.setOwner(user);
        return bookRepository.save(book).getId();
    }

    public BookResponse findById(Long id) {
        return bookRepository.findById(id)
                .map(bookMapper::toBookResponse)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id " + id));
    }

    public PageResponse<BookResponse> findAll(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Book> pageResult = bookRepository.findAllPublicBooks(user.getId(), pageable);
        List<BookResponse> books = pageResult.stream()
                .map(bookMapper::toBookResponse)
                .toList();
        return new PageResponse<>(
                books,
                pageResult.getNumber(),
                pageResult.getSize(),
                pageResult.getTotalElements(),
                pageResult.getTotalPages(),
                pageResult.isFirst(),
                pageResult.isLast()
        );

    }
}
