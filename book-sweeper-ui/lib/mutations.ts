import { registerUser } from "@/lib/api";
import useSWRMutation from "swr/mutation";

export const useRegister = () => {
    return useSWRMutation("/auth/register", registerUser, {
        onSuccess: () => {
            // Redirect to the dashboard
        },
        onError: (error) => {

        }
    });
}
