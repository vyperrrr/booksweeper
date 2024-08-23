
import {BookCard} from "@/components/book-card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {bookApi} from "@/shared/api/user-client";
import {cookies} from "next/headers";
import {PaginationControls} from "@/components/pagination-controls";
import {BookList} from "@/app/(protected)/explore/book-list";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 2;

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const page = searchParams.page ?? DEFAULT_PAGE.toString();
    const per_page = searchParams.per_page ?? DEFAULT_PER_PAGE.toString();

    const { data: allBooks } = await bookApi.findAllBooks({
        page: parseInt(page as string)-1,
        size: parseInt(per_page as string),
    }, {
        headers: {
            Cookie: cookies().toString(),
        }
    });

    const lowerBound = (allBooks?.page ?? 0) * (allBooks?.size ?? 0) + 1;
    const upperBound = (allBooks?.page ?? 0) * (allBooks?.size ?? 0) + (allBooks?.last ? (allBooks?.totalElements ?? 0) - (allBooks?.page ?? 0) * (allBooks?.size ?? 0) : (allBooks?.size ?? 0));

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Browse Books</h2>
                    <p className="text-sm text-muted-foreground">({`${lowerBound}-${upperBound}`}) out of {allBooks.totalElements}</p>
                </div>

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
            <BookList books={allBooks.content} />
            <PaginationControls
                defaultPage={DEFAULT_PAGE}
                defaultPerPage={DEFAULT_PER_PAGE}
                isFirst={allBooks.first}
                isLast={allBooks.last}
                totalPages={allBooks.totalPages} />
        </div>
    );
};