"use client";


import * as React from 'react';
import {BookCard} from "@/components/book-card";
import {BookResponse} from "@/shared/api/axios-client";

interface ReturnedBookListProps {
    returnedBooks: BookResponse[] | undefined;
}

export const ReturnedBookList: React.FC<ReturnedBookListProps> = ({ returnedBooks }) => {
    return (
        <section className="mb-8 md:mb-12">
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {returnedBooks?.map((book) => (
                    <BookCard book={book} key={book.id}/>
                ))}
            </div>
        </section>
    );
};