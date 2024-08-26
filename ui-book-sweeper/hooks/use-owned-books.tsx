import {useQuery} from "@tanstack/react-query";
import {bookApi} from "@/shared/api/user-client";

export const useOwnedBooks = () => {
    return useQuery({
        queryKey: ["ownedBooks",],
        queryFn: () => bookApi.findAllBooksByOwner({}, {
            withCredentials: true,
        }),
    })
}