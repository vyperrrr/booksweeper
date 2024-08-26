import {useMutation} from "@tanstack/react-query";
import {bookApi} from "@/shared/api/user-client";
import {BookApiUpdateShareableAttributeRequest} from "@/shared/api/axios-client";

export const useBookStatus = () => {

    const {mutate: changeStatus} = useMutation({
        mutationFn: (data: BookApiUpdateShareableAttributeRequest) => bookApi.updateShareableAttribute(data, {
            withCredentials: true
        })
    });

    const handleChangeStatus = (id: number) => {
        return changeStatus({
            bookId: id,
        });
    }

    return {
        handleChangeStatus
    }
}