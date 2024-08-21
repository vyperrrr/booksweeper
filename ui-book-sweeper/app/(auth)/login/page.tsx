// @flow
import * as React from 'react';
import {LoginForm} from "@/app/(auth)/login/login-form";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import {cookies} from "next/headers";


export default function Page() {
    console.log(cookies().get("access_token"));
    return (
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-extrabold">Login</CardTitle>
                    <CardDescription>
                        Sign in to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm/>
                </CardContent>
                <CardFooter className="justify-between text-sm">
                    <p>Don't have an account?</p>
                    <Link href="/register" className="underline">Sign up</Link>
                </CardFooter>
            </Card>
    );
};