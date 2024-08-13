package com.cicau.book.service;

import com.cicau.book.dtos.BookRequest;
import com.cicau.book.dtos.BookResponse;
import com.cicau.book.entity.Book;
import org.springframework.stereotype.Service;

@Service
public class BookMapper {

    public Book toBook(BookRequest request) {
        return Book.builder()
                .id(request.id())
                .title(request.title())
                .authorName(request.authorName())
                .synopsis(request.synopsis())
                .archived(false)
                .shareable(request.shareable())
                .build();
    }

    public BookResponse toBookResponse(Book book)
    {
        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .authorName(book.getAuthorName())
                .isbn(book.getIsbn())
                .synopsis(book.getSynopsis())
                .owner(book.getOwner().getFullName())
                .rate(book.getRate())
                .archived(book.isArchived())
                .shareable(book.isShareable())
                .build();
    }
}
