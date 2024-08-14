package com.cicau.book.service;

import com.cicau.book.dtos.BookRequest;
import com.cicau.book.dtos.BookResponse;
import com.cicau.book.dtos.BorrowedBookResponse;
import com.cicau.book.dtos.PageResponse;
import com.cicau.book.entity.Book;
import com.cicau.book.entity.BookTransactionHistory;
import com.cicau.book.entity.User;
import com.cicau.book.exception.OperationNotPermittedException;
import com.cicau.book.repository.BookRepository;
import com.cicau.book.repository.BookTransactionHistoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.cicau.book.specification.BookSpecification.*;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final BookTransactionHistoryRepository bookTransactionHistoryRepository;

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

    public PageResponse<BookResponse> findAllByOwner(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Book> pageResult = bookRepository.findAll(withOwnerId(user.getId()), pageable);
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

    public PageResponse<BorrowedBookResponse> findAllBorrowedBooks(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<BookTransactionHistory> allBorrowedBooks = bookTransactionHistoryRepository.findAllBorrowedBooks(user.getId(), pageable);
        List<BorrowedBookResponse> bookResponse = allBorrowedBooks.stream()
                .map(bookMapper::toBorrowedBookResponse)
                .toList();

        return new PageResponse<>(
                bookResponse,
                allBorrowedBooks.getNumber(),
                allBorrowedBooks.getSize(),
                allBorrowedBooks.getTotalElements(),
                allBorrowedBooks.getTotalPages(),
                allBorrowedBooks.isFirst(),
                allBorrowedBooks.isLast()
        );

    }

    public PageResponse<BorrowedBookResponse> findAllReturnedBooks(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<BookTransactionHistory> allReturnedBooks = bookTransactionHistoryRepository.findAllReturnedBooks(user.getId(), pageable);
        List<BorrowedBookResponse> bookResponse = allReturnedBooks.stream()
                .map(bookMapper::toBorrowedBookResponse)
                .toList();

        return new PageResponse<>(
                bookResponse,
                allReturnedBooks.getNumber(),
                allReturnedBooks.getSize(),
                allReturnedBooks.getTotalElements(),
                allReturnedBooks.getTotalPages(),
                allReturnedBooks.isFirst(),
                allReturnedBooks.isLast()
        );
    }

    public Long updateShareableAttribute(Long id, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id " + id));
        if (!book.getOwner().getId().equals(user.getId())) {
            throw new OperationNotPermittedException("Since you are not the owner of this book, you cannot update its shareable status");
        }
        book.setShareable(!book.isShareable());
        return bookRepository.save(book).getId();
    }

    public Long updateArchivedAttribute(Long id, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id " + id));
        if (!book.getOwner().getId().equals(user.getId())) {
            throw new OperationNotPermittedException("Since you are not the owner of this book, you cannot update its archived status");
        }
        book.setShareable(!book.isArchived());
        return bookRepository.save(book).getId();
    }
}
