"use client";

import {useOwnedBooks} from "@/lib/queries";
import Link from "next/link";
import * as React from "react";
import {BooksNotFound} from "@/app/profile/books-not-found";

export const MyBooks = () => {
    const {data, error} = useOwnedBooks();

    if (data?.content.length === 0) {
        return <BooksNotFound title="You have not added any books yet"/>
    }

    return (
        <div className="grid grid-cols-4 gap-12">
            {data?.content.map(book => (
                <Link href={`/books/${book.id}`}>
                    <div key={book.id} className="card bg-base-100 shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{book.title}</h2>
                            <p>{book.synopsis}</p>
                        </div>
                    </div>
                </Link>

            ))}
        </div>
    );
};