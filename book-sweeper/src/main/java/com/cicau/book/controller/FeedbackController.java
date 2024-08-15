package com.cicau.book.controller;

import com.cicau.book.dtos.FeedbackRequest;
import com.cicau.book.entity.Feedback;
import com.cicau.book.service.FeedbackService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
@Tag(name = "Feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Long> saveFeedback(@RequestBody @Valid FeedbackRequest feedback, Authentication connectedUser) {
        return ResponseEntity.ok(feedbackService.save(feedback, connectedUser));
    }
}
