"use client";

import { OTPInput, SlotProps } from 'input-otp'
import {useVerifyOTP} from "@/lib/mutations";
import Link from "next/link";

export default function Page() {
    const { data, error, trigger,reset } = useVerifyOTP();

    const [value, setValue] = useState("");

    const handleVerifyOTP = async () => await trigger({ code: value });

    if(error) {
        return (
            <div className="card bg-base-100 max-w-lg shadow-xl">
                <div className="card-body">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-extrabold">Account activation failed</h1>
                        <p>An error occurred, the code you have provided might have been wrong or already expired.
                            Please try
                            again.</p>
                        <button onClick={reset} className="btn btn-lg btn-primary w-full">Try again</button>
                    </div>
                </div>
            </div>
        )
    }

    if (!error) {
        return (
            <div className="card bg-base-100 max-w-lg shadow-xl">
                <div className="card-body">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-extrabold">Account activated successfully</h1>
                        <p>Your account has been activated successfully, you can proceed to the login screen.</p>
                        <div>
                            <Link href="/login">
                                <button className="btn btn-lg btn-primary w-full">Sign in</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="card bg-base-100 max-w-xl shadow-xl">
            <div className="card-body">
                <div className="space-y-4">
                    <h1 className="text-5xl font-extrabold">Account activation</h1>
                    <p>Check your email address for the activation code.</p>
                    <OTPInput
                        maxLength={6}
                        onChange={setValue}
                        containerClassName="group flex items-center has-[:disabled]:opacity-30 justify-center"
                        render={({slots}) => (
                            <>
                                <div className="flex">
                                    {slots.map((slot, idx) => (
                                        <Slot key={idx} {...slot} />
                                    ))}
                                </div>
                            </>
                        )}
                    />
                    <button onClick={handleVerifyOTP} className="btn btn-lg btn-primary w-full">Verify</button>
                </div>
            </div>
        </div>

    );
};

function Slot(props: SlotProps) {
    return (
        <div
            className={cn(
                'relative w-10 h-14 text-[2rem]',
                'flex items-center justify-center',
                'transition-all duration-300',
                'border-y border-r first:border-l first:rounded-l-md last:rounded-r-md',
                'group-hover:border-primary group-focus-within:border-primary',
                'outline outline-0 outline-primary',
                {'outline-4 outline-primary': props.isActive},
            )}
        >
            {props.char !== null && <div>{props.char}</div>}
            {props.hasFakeCaret && <FakeCaret/>}
        </div>
    )
}

// You can emulate a fake textbox caret!
function FakeCaret() {
    return (
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
            <div className="w-px h-8 bg-white" />
        </div>
    )
}

// tailwind.config.ts for the blinking caret animation.
const config = {
    theme: {
        extend: {
            keyframes: {
                'caret-blink': {
                    '0%,70%,100%': { opacity: '1' },
                    '20%,50%': { opacity: '0' },
                },
            },
            animation: {
                'caret-blink': 'caret-blink 1.2s ease-out infinite',
            },
        },
    },
}

// Small utility to merge class names.
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";
import {useState} from "react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}