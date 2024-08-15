package com.cicau.book.dtos;

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
