"use client";

import {useBook} from "@/lib/queries";
import {useParams} from "next/navigation";


export const Book = () => {
    const { id } = useParams<{ id: string }>();

    const { data } = useBook(id)

    return (
        <div>
            <h1>{data?.title}</h1>
            <p>{data?.authorName}</p>
        </div>
    );
};