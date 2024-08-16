import * as React from 'react';
import Image from "next/image";
import book from "@/assets/book.svg";

export const BooksNotFound = ({ title }: { title: string }) => {
    return (
        <div className="flex flex-col gap-2 items-center mt-20">
            <p className="text-3xl">{title}</p>
            <Image alt="book" src={book.src} height={book.height} width={book.width} className="h-64 w-64"/>
        </div>
    );
};