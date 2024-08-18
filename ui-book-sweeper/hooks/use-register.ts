import { useMutation } from "@tanstack/react-query";
import { authenticationApi } from "@/shared/api/user-client";

export const useRegister = () => {
    return useMutation({
        mutationFn: authenticationApi.register,
    })
}