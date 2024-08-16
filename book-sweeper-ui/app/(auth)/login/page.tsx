"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ErrorMessage } from "@hookform/error-message"
import { useLoginUser } from "@/lib/mutations";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export default function Page() {
    const router = useRouter();

    const { trigger } = useLoginUser();

    const { formState: { errors }, register , handleSubmit} = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await trigger(values).then(
            (response) => {
                if(response.token) {
                    router.replace("/activate-account");
                }
            }
        );
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body space-y-4">
                <div>
                    <h2 className="card-title text-3xl font-extrabold">Sign In</h2>
                    <p>Log into your account</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label className="form-control w-full max-w-xs">
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                                </svg>
                                <input {...register("email")} type="email" className="grow" placeholder="Email"/>
                            </label>
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({ message }) =>
                                    <div className="label">
                                        <span className="label-text-alt">{message}</span>
                                    </div>
                                }
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd"/>
                                </svg>
                                <input {...register("password")} type="password" className="grow"
                                       placeholder="********"/>
                            </label>
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({ message }) =>
                                    <div className="label">
                                        <span className="label-text-alt">{message}</span>
                                    </div>
                                }
                            />
                        </label>
                    </div>
                    <button className="btn btn-accent w-full">Sign Up</button>
                </form>
                <div>
                    <p>Doesn't have an account yet? <a href="#" className="link">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
}