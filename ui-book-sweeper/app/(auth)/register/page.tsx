import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import * as React from "react";
import {RegisterForm} from "@/app/(auth)/register/register-form";

export default function Page() {
    return (
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-extrabold">Register</CardTitle>
                    <CardDescription>
                        Create your account to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm/>
                </CardContent>
                <CardFooter className="justify-between text-sm">
                    <p>Already have an account?</p>
                    <Link href="/login" className="underline">Sign in</Link>
                </CardFooter>
            </Card>
    );
};