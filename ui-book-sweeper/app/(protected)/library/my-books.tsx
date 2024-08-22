import * as React from 'react';
import {bookApi} from "@/shared/api/user-client";
import {cookies} from "next/headers";
import {BookCard} from "@/components/book-card";
import {MyBookList} from "@/app/(protected)/library/my-book-list";

export async function MyBooks() {

    const {data: myBooks} = await bookApi.findAllBooksByOwner({
        page: 0,
        size: 20,
    }, {
        headers: {
            Cookie: cookies().toString(),
        }
    });

    return <MyBookList myBooks={myBooks.content}/>;
}