import {useMutation} from "@tanstack/react-query";
import {bookApi} from "@/shared/api/user-client";
import {BookApiBorrowBookRequest} from "@/shared/api/axios-client";

export const useBorrowBook = () => {
    return useMutation({
        mutationFn: (data: BookApiBorrowBookRequest) => bookApi.borrowBook(data, {
            withCredentials: true,
        }),
    })
}