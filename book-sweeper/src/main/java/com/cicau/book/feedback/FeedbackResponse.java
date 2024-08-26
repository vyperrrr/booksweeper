package com.cicau.book.feedback;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackResponse {

    private Double rate;
    private String comment;
    private boolean ownFeedback;

}
