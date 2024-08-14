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

    public Long borrowBook(Long id, Authentication connectedUser) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id " + id));

        if(book.isArchived() || !book.isShareable())
            throw new OperationNotPermittedException("This book is not available for borrow since it is either archived or not shareable");

        User user = (User) connectedUser.getPrincipal();

        if(book.getOwner().getId().equals(user.getId()))
            throw new OperationNotPermittedException("You cannot borrow a book that you own");

        final boolean isAlreadyBorrowedByUser = bookTransactionHistoryRepository.isAlreadyBorrowedByUser(book.getId(), user.getId());

        if(isAlreadyBorrowedByUser)
            throw new OperationNotPermittedException("You have already borrowed this book and it is not yet returned");

        final boolean isAlreadyBorrowedByOtherUser = bookTransactionHistoryRepository.isAlreadyBorrowedByOtherUser(book.getId());

        if (isAlreadyBorrowedByOtherUser) {
            throw new OperationNotPermittedException("The requested book is already borrowed by another user");
        }

        BookTransactionHistory newTransaction = BookTransactionHistory.builder()
                .user(user)
                .book(book)
                .returned(false)
                .returnApproved(false)
                .build();

        return bookTransactionHistoryRepository.save(newTransaction).getId();
    }

    public Long returnBook(Long id, Authentication connectedUser) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id " + id));

        if(book.isArchived() || !book.isShareable())
            throw new OperationNotPermittedException("This book is not available for return since it is either archived or not shareable");

        User user = (User) connectedUser.getPrincipal();

        if(book.getOwner().getId().equals(user.getId()))
            throw new OperationNotPermittedException("You cannot return a book that you own");

        BookTransactionHistory transaction = bookTransactionHistoryRepository.findByBookIdAndUserId(id, user.getId())
                .orElseThrow(() -> new OperationNotPermittedException("You did not borrow this book"));

        transaction.setReturned(true);

        return bookTransactionHistoryRepository.save(transaction).getId();
    }

    public Long approveReturnedBook(Long id, Authentication connectedUser) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id " + id));

        if (book.isArchived() || !book.isShareable()) {
            throw new OperationNotPermittedException("The requested book is archived or not shareable");
        }

        User user = (User) connectedUser.getPrincipal();

        if(book.getOwner().getId().equals(user.getId()))
            throw new OperationNotPermittedException("You cannot approve a return for a book that you do not own");

        BookTransactionHistory transaction = bookTransactionHistoryRepository.findByBookIdAndOwnerId(id, user.getId())
                .orElseThrow(() -> new OperationNotPermittedException("The book is not returned yet. You cannot approve its return"));

        transaction.setReturnApproved(true);

        return bookTransactionHistoryRepository.save(transaction).getId();
    }
}
