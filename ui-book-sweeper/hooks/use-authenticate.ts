import { useMutation } from "@tanstack/react-query";
import { authenticationApi } from "@/shared/api/user-client";
import {AuthenticationApiAuthenticateRequest} from "@/shared/api/axios-client";

export const useAuthenticate = () => {
    return useMutation({
        mutationFn: (data: AuthenticationApiAuthenticateRequest) => authenticationApi.authenticate(data, {
            withCredentials: true,
        }),
    })
}