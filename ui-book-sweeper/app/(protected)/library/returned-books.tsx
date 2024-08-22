import * as React from 'react';
import {bookApi} from "@/shared/api/user-client";
import {cookies} from "next/headers";
import {BookCard} from "@/components/book-card";
import {ReturnedBookList} from "@/app/(protected)/library/returned-book-list";

export async function ReturnedBooks() {

    const {data: returnedBooks} = await bookApi.findAllReturnedBooks({
        page: 0,
        size: 20,
    }, {
        headers: {
            Cookie: cookies().toString(),
        }
    });

    return <ReturnedBookList returnedBooks={returnedBooks.content}/>;

}