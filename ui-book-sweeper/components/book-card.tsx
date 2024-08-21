import {Card} from "@/components/ui/card";
import {CopyIcon, PlusIcon, StarIcon} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {BookResponse} from "@/shared/api/axios-client";

export const BookCard = ({ book }: { book: BookResponse }) => {
    return (
        <Card className="relative">
            <div className="absolute -top-3 -right-3 z-10">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png"/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">Username</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
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
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 group-hover:hidden">
                    <h3 className="text-lg font-bold text-white">{book.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-white">
                        <StarIcon className="h-4 w-4 fill-primary"/>
                        <span>4.8</span>
                        <span className="text-muted-foreground">(123 reviews)</span>
                    </div>
                </div>
                <div
                    className="absolute space-y-2 bottom-0 left-0 right-0 px-4 py-4 hidden group-hover:block bg-secondary/80 h-full overflow-y-auto no-scrollbar max-h-full">
                    <div className="space-y-1">
                        <div>
                            <h3 className="text-lg font-bold text-white">{book.title}</h3>
                            <p className="text-xs">{book.authorName}</p>
                        </div>
                        <div className="text-muted-foreground text-xs flex gap-2 items-center">
                            <span>ISBN: {book.isbn}</span>
                            <Button className="w-3 h-3" size="icon" variant="ghost">
                                <CopyIcon />
                            </Button>

                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                            <StarIcon className="h-4 w-4 fill-primary"/>
                            <span>4.8</span>
                            <span className="text-muted-foreground">(123 reviews)</span>
                        </div>
                    </div>
                    <div className="text-muted-foreground text-sm text-pretty indent-8 text-justify">
                        {book.synopsis}
                    </div>
                </div>
                <div
                    className="absolute bottom-0 left-0 right-0 hidden group-hover:block bg-secondary/40 backdrop-blur py-4 px-4">
                    <Button size="lg" className="w-full text-mute font-bold">Borrow book</Button>
                </div>
            </div>
        </Card>
    );
};