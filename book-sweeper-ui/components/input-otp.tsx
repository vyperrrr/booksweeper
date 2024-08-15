// @flow 
import * as React from 'react';

type Props = {
    
};
export const InputOtp = (props: Props) => {
    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-extrabold">Enter verification code</h2>
            <div className="flex gap-2">
                {Array.from({length: 6}).map((_, index) => (
                    <input className="input input-bordered w-16 input-lg text-xl"/>
                ))}
            </div>
            <button className="btn btn-lg btn-primary w-full">Verify</button>
            <p>Didn't receive the code? <a href="#" className="link">Resend</a></p>
        </div>
    );
};