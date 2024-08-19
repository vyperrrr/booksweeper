import Link from "next/link";
import {BookIcon, PaintbrushIcon, PlusIcon, SearchIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Navigation = () => {
    return (
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="#" className="flex items-center gap-2 font-bold" prefetch={false}>
                    <PaintbrushIcon className="h-6 w-6"/>
                    <span className="tracking-tight">Booksweeper</span>
                </Link>
                <nav className="hidden items-center gap-4 md:flex">
                    <Link href="/explore" className="text-sm font-medium hover:underline" prefetch={false}>
                        Explore
                    </Link>
                    <Link href="/library" className="text-sm font-medium hover:underline" prefetch={false}>
                        My Library
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                        Community
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                        About
                    </Link>
                </nav>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="search"
                            placeholder="Search books..."
                            className="h-9 w-48 rounded-md bg-muted pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant="secondary" size="sm">
                                    <PlusIcon className="h-4 w-4"/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add a book to your library</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
};