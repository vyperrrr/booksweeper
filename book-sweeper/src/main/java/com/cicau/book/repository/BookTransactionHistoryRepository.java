package com.cicau.book.repository;

import com.cicau.book.entity.BookTransactionHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory, Long> {

    @Query("SELECT h FROM BookTransactionHistory h WHERE h.user.id = :userId")
    Page<BookTransactionHistory> findAllBorrowedBooks(Long userId, Pageable pageable);

    @Query("SELECT h FROM BookTransactionHistory h WHERE h.book.owner.id = :userId AND h.returned = true")
    Page<BookTransactionHistory> findAllReturnedBooks(Long id, Pageable pageable);
}
