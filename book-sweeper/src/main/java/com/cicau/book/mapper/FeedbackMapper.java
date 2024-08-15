package com.cicau.book.mapper;

import com.cicau.book.dtos.FeedbackRequest;
import com.cicau.book.entity.Book;
import com.cicau.book.entity.Feedback;
import org.springframework.stereotype.Service;

@Service
public class FeedbackMapper {

    public Feedback toFeedback(FeedbackRequest request) {
        return Feedback.builder()
                .rate(request.rate())
                .comment(request.comment())
                .book(Book.builder()
                        .id(request.bookId())
                        .build())
                .build();
    }
}
