import { useMutation } from "@tanstack/react-query";
import { bookApi } from "@/shared/api/user-client";
import {BookApiUploadBookCoverRequest} from "@/shared/api/axios-client";

export const useUploadBookCover = () => {
    return useMutation({
        mutationFn: (data: BookApiUploadBookCoverRequest) => bookApi.uploadBookCover(data, {
            withCredentials: true,
        }),
    })
}