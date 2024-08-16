import useSWR from "swr";
import {getBook, getBooks} from "@/lib/api";

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

export const useBooks = () => {
    return useSWR<Page<Book>>("/books", getBooks);
}

export const useBook = (id: string) => {
    return useSWR<Book>(`/books/${id}`, getBook);
}