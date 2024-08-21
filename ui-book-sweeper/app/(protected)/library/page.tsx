import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {BookCard} from "@/components/book-card";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ArchiveRestoreIcon, PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";


export default function Page() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Library</h2>
                <div className="flex items-center gap-4">
                    <Select>
                        <SelectTrigger className="h-9 w-40 rounded-md bg-muted text-sm">
                            <SelectValue placeholder="Genre"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fiction">Fiction</SelectItem>
                            <SelectItem value="biography">Biography</SelectItem>
                            <SelectItem value="romance">Romance</SelectItem>
                            <SelectItem value="mystery">Mystery</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="h-9 w-40 rounded-md bg-muted text-sm">
                            <SelectValue placeholder="Sort by"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                            <SelectItem value="title">Title</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Tabs defaultValue="my-books" className="flex flex-col mt-4">
                <TabsList className="flex justify-between border-b border-muted">
                    <div>
                        <TabsTrigger value="my-books">My Books</TabsTrigger>
                        <TabsTrigger value="borrowed">Borrowed Books</TabsTrigger>
                        <TabsTrigger value="returned">Returned Books</TabsTrigger>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant="ghost" size="sm"><ArchiveRestoreIcon className="h-5 w-5" /></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Show archived books</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </TabsList>
            </Tabs>
            <section className="mb-8 md:mb-12">
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {Array.from({length: 20}).map((_, index) => (
                        <BookCard key={index}/>
                    ))}
                </div>
            </section>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};