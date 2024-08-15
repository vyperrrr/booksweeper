package com.cicau.book.service;

import com.cicau.book.dtos.FeedbackRequest;
import com.cicau.book.dtos.FeedbackResponse;
import com.cicau.book.dtos.PageResponse;
import com.cicau.book.entity.Book;
import com.cicau.book.entity.Feedback;
import com.cicau.book.entity.User;
import com.cicau.book.exception.OperationNotPermittedException;
import com.cicau.book.mapper.FeedbackMapper;
import com.cicau.book.repository.BookRepository;
import com.cicau.book.repository.FeedbackRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public PageResponse<FeedbackResponse> findAllFeedbacksByBook(int page, int size, Long bookId, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);

        User user = (User) connectedUser.getPrincipal();

        Page<Feedback> pageResult = feedbackRepository.findAllByBookId(bookId, pageable);

        List<FeedbackResponse> feedbacks = pageResult.stream().map(feedback -> feedbackMapper.toFeedbackResponse(feedback, user.getId())).toList();

        return new PageResponse<>(
                feedbacks,
                pageResult.getNumber(),
                pageResult.getSize(),
                pageResult.getTotalElements(),
                pageResult.getTotalPages(),
                pageResult.isFirst(),
                pageResult.isLast()
        );

    }
}
