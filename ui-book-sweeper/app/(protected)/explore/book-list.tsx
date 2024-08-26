"use client";

import * as React from 'react';
import {BookCard} from "@/components/book-card";
import {BookResponse} from "@/shared/api/axios-client";
import {useBorrowBook} from "@/hooks/use-borrow-book";

interface BookListProps {
    books: BookResponse[] | undefined;
}

export const BookList: React.FC<BookListProps> = ({ books }) => {

    const { mutate } = useBorrowBook();

    const handleBorrow = (bookId: number) => {
        mutate({
            bookId,
        }, {
            onSuccess: () => {
                alert("Book borrowed successfully!");
            }
        });
    }

    return (
        <section className="mb-8 md:mb-12">
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {books?.map((book) => (
                    <BookCard key={book.id} book={book} forBorrow onBorrow={handleBorrow}/>
                ))}
            </div>
        </section>
    );
};