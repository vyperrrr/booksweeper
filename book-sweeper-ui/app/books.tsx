"use client";

import * as React from 'react';
import {getBooks} from "@/lib/api";
import useSWR from "swr";

type Book = {
     id: number;
     title: string;
     authorName: string;
     isbn: string;
     synopsis: string;
     owner: string;
     bookCoverUrl: string;
     rate: number;
     archived: boolean;
     shareable: boolean;
};

interface Page<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export const Books = () => {
    const {data, error} = useSWR<Page<Book>>('/books', getBooks);

    return (
        <div className="grid grid-cols-4 gap-12 mx-auto max-w-7xl">
            {data?.content.map(book => (
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
            ))}
        </div>
    );
};