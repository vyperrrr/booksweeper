"use client";

import {InputOtp} from "@/components/input-otp";

export default function Page() {
    return (
        <div className="space-y-4">
            <h1 className="text-5xl font-extrabold">Activate Account</h1>
            <p>Click the link in the email we sent you to activate your account.</p>
            <InputOtp />
        </div>
    );
};