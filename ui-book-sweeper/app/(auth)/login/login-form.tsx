"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

import {FcGoogle} from "react-icons/fc";
import {useAuthenticate} from "@/hooks/use-authenticate";
import useAuthStore from "@/store/use-auth-store";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8),
})

export const LoginForm = () => {
    const router = useRouter();

    const {mutate} = useAuthenticate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate({
            authenticationRequest: values,
        }, {
            onSuccess: (res) => {
                router.push("/explore")
            },
        });
    }

    return (
        <div className="space-y-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="example@email.com"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} placeholder="********"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>
            <div className="relative flex items-center py-2">
                <div className="flex-1 border-t border-muted"/>
                <span className="mx-2 text-muted-foreground">OR</span>
                <div className="flex-1 border-t border-muted"/>
            </div>
            <Button variant="outline" className="w-full gap-2">
                <FcGoogle/> Sign in with Google
            </Button>
        </div>
    )
};