import {useMutation} from "@tanstack/react-query";
import {bookApi} from "@/shared/api/user-client";
import {BookApiSaveBookRequest} from "@/shared/api/axios-client";

export const useSaveBook = () => {
    return useMutation({
        mutationFn: (book: BookApiSaveBookRequest) => bookApi.saveBook(book, {
            withCredentials: true,
        }),
    })
}