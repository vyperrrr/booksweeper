// @flow
import * as React from 'react';
import {bookApi} from "@/shared/api/user-client";
import {cookies} from "next/headers";
import {BookCard} from "@/components/book-card";

export async function MyBooks() {

    const {data: myBooks} = await bookApi.findAllBooksByOwner({
        page: 0,
        size: 20,
    }, {
        headers: {
            Cookie: cookies().toString(),
        }
    });

    return (
        <section className="mb-8 md:mb-12">
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {myBooks?.content?.map((book) => (
                    <BookCard book={book} key={book.id}/>
                ))}
            </div>
        </section>
    );
};