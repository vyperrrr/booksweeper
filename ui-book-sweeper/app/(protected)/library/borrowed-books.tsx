
import * as React from 'react';
import {bookApi} from "@/shared/api/user-client";
import {cookies} from "next/headers";
import {BookCard} from "@/components/book-card";
import {BorrowedBookList} from "@/app/(protected)/library/borrowed-book-list";

export async function BorrowedBooks() {

    const {data: borrowedBooks} = await bookApi.findAllBorrowedBooks({
        page: 0,
        size: 20,
    }, {
        headers: {
            Cookie: cookies().toString(),
        }
    });

    return <BorrowedBookList borrowedBooks={borrowedBooks?.content} />;
}