import { useMutation } from "@tanstack/react-query";
import { authenticationApi } from "@/shared/api/user-client";

export const useAuthenticate = () => {
    return useMutation({
        mutationFn: authenticationApi.authenticate,
    })
}