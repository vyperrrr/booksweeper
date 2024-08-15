package com.cicau.book.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "feedback")
public class Feedback extends BaseEntity {

    private Double rate;
    private String comment;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

}
