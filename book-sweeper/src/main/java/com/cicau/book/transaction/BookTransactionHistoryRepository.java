package com.cicau.book.transaction;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory, Long> {

    @Query("SELECT h FROM BookTransactionHistory h WHERE h.user.id = :userId")
    Page<BookTransactionHistory> findAllBorrowedBooks(Long userId, Pageable pageable);

    @Query("SELECT h FROM BookTransactionHistory h WHERE h.book.owner.id = :userId AND h.returned = true")
    Page<BookTransactionHistory> findAllReturnedBooks(Long userId, Pageable pageable);

    @Query("SELECT (COUNT(*) > 0) as isBorrowed FROM BookTransactionHistory h WHERE h.book.id = :bookId AND h.user.id = :userId AND h.returnApproved = false")
    boolean isAlreadyBorrowedByUser(Long bookId, Long userId);

    @Query("SELECT (COUNT(*) > 0) as isBorrowed FROM BookTransactionHistory h WHERE h.book.id = :bookId  AND h.returnApproved = false")
    boolean isAlreadyBorrowedByOtherUser(Long bookId);

    @Query("SELECT h FROM BookTransactionHistory h WHERE h.book.id = :bookId AND h.user.id = :userId AND h.returned = false AND h.returnApproved = false")
    Optional<BookTransactionHistory> findByBookIdAndUserId(Long bookId, Long userId);

    @Query("SELECT h FROM BookTransactionHistory h WHERE h.book.id = :bookId AND h.book.owner.id = :userId AND h.returned = true AND h.returnApproved = false")
    Optional<BookTransactionHistory> findByBookIdAndOwnerId(Long bookId, Long userId);
}
