package com.cicau.book.mapper;

import com.cicau.book.dtos.FeedbackRequest;
import com.cicau.book.dtos.FeedbackResponse;
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

    public FeedbackResponse toFeedbackResponse(Feedback feedback, Long userId) {
        return FeedbackResponse.builder()
                .rate(feedback.getRate())
                .comment(feedback.getComment())
                .ownFeedback(feedback.getBook().getOwner().getId().equals(userId))
                .build();
    }
}
