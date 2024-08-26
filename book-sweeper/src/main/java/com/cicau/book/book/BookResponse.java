package com.cicau.book.book;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookResponse {

    private Long id;
    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private String owner;
    private String bookCoverUrl;
    private double rate;
    private boolean archived;
    private boolean shareable;

}
