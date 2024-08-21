
import {BookCard} from "@/components/book-card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


import {bookApi} from "@/shared/api/user-client";
import {cookies} from "next/headers";

export default async function Page() {

    const { data: allBooks } = await bookApi.findAllBooks({
        page: 0,
        size: 20,
    }, {
        headers: {
            Cookie: cookies().toString(),
        }
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Browse Books</h2>
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
            <section className="mb-8 md:mb-12">
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {allBooks?.content?.map((book) => (
                        <BookCard book={book} key={book.id}/>
                    ))}
                </div>
            </section>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
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
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>

    );
};