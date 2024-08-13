package com.cicau.book.repository;

import com.cicau.book.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, Long>, JpaSpecificationExecutor<Book> {

    @Query("SELECT b FROM Book b WHERE b.owner.id = :id AND b.archived = false AND b.shareable = true")
    Page<Book> findAllPublicBooks(Long id, Pageable pageable);
}
