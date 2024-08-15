package com.cicau.book.service;

import com.cicau.book.dtos.FeedbackRequest;
import com.cicau.book.entity.Book;
import com.cicau.book.entity.Feedback;
import com.cicau.book.entity.User;
import com.cicau.book.exception.OperationNotPermittedException;
import com.cicau.book.mapper.FeedbackMapper;
import com.cicau.book.repository.BookRepository;
import com.cicau.book.repository.FeedbackRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final BookRepository bookRepository;
    private final FeedbackMapper feedbackMapper;

    public Long save(FeedbackRequest request, Authentication connectedUser) {
        Long bookId = request.bookId();

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id " + bookId));

        if(book.isArchived() || !book.isShareable())
            throw new OperationNotPermittedException("You can't rate an archived or not shareable book");

        User user = (User) connectedUser.getPrincipal();

        if(book.getOwner().getId().equals(user.getId())) {
            throw new OperationNotPermittedException("You can't rate your own book");
        }

        Feedback feedback = feedbackMapper.toFeedback(request);

        return feedbackRepository.save(feedback).getId();
    }
}
