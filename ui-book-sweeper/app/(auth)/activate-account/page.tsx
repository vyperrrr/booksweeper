import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {LoginForm} from "@/app/(auth)/login/login-form";
import Link from "next/link";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {InputOTPForm} from "@/app/(auth)/activate-account/input-otp-form";

export default function Page() {
    return (
        <div className="flex h-screen justify-center items-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-extrabold">Enter OTP</CardTitle>
                    <CardDescription>
                        Please enter the 6 digit activation code sent to your email.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <InputOTPForm />
                </CardContent>
                <CardFooter className="justify-between text-sm">
                    <p>Didn't receive the code?</p>
                    <Button variant="secondary">Resend</Button>
                </CardFooter>
            </Card>
        </div>
    );
}