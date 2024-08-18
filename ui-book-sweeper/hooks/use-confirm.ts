import { useMutation } from "@tanstack/react-query";
import { authenticationApi } from "@/shared/api/user-client";

export const useConfirm = () => {
    return useMutation({
        mutationFn: authenticationApi.confirm,
    })
}