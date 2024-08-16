import {loginUser, registerUser, verifyOTP} from "@/lib/api";
import useSWRMutation from "swr/mutation";
import {cookies} from "next/headers";

export const useRegisterUser = () => {
    return useSWRMutation("/auth/register", registerUser);
}

export const useLoginUser = () => {
    return useSWRMutation("/auth/authenticate", loginUser);
}

export const useVerifyOTP = () => {
    return useSWRMutation("/auth/activate-account", verifyOTP);
}