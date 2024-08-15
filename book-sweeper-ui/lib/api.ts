import { axiosInstance } from "@/lib/axios";

export const registerUser = async (url: string, { arg } : { arg:  {
        firstName: string,
        lastName: string,
        email: string,
        password: string
    }}

) => {
    return axiosInstance.post(url, arg).then(res => res.data)
}

export const loginUser = async (url: string, { arg } : { arg:  {
        email: string,
        password: string
    }}
) => {
    return axiosInstance.post(url, arg).then(res => res.data)
}
