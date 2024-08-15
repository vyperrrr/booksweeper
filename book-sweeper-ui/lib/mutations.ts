import {loginUser, registerUser} from "@/lib/api";
import useSWRMutation from "swr/mutation";

export const useRegister = () => {
    return useSWRMutation("/auth/register", registerUser);
}

export const useLogin = () => {
    return useSWRMutation("/auth/authenticate", loginUser);
}