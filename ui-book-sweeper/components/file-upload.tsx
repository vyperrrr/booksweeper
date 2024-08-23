// @flow 
import * as React from 'react';
import {InputFile} from "@/components/file-input";
import {Card} from "@/components/ui/card";

export const FileUpload = () => {
    return (
        <div className="flex flex-col gap-4">
            <Card className="relative">
                <div className="relative block overflow-hidden rounded-lg group">
                    <img
                        src={"https://via.placeholder.com/600/474645"}
                        width={300}
                        height={400}
                        alt="Book Cover"
                        className="h-[400px] w-full object-cover transition-all duration-300 group-hover:scale-105"
                        style={{aspectRatio: "300/400", objectFit: "cover"}}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
                </div>
            </Card>
            <InputFile/>
        </div>

    );
};