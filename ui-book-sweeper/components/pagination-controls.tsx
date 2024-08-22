"use client";

import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {useRouter, useSearchParams} from "next/navigation";
import React from "react";

interface PaginationControlsProps {
    defaultPage: number;
    defaultPerPage: number;
    isFirst: boolean | undefined;
    isLast: boolean | undefined;
    totalPages: number | undefined;
}

const MAX_PREV_PAGES = 3;
const MAX_NEXT_PAGES = 3;

export const PaginationControls: React.FC<PaginationControlsProps> = ({
                                                                          defaultPage,
                                                                          defaultPerPage,
                                                                          isFirst,
                                                                          isLast,
                                                                          totalPages
                                                                      }) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get("page") ?? defaultPage.toString();
    const per_page = searchParams.get("per_page") ?? defaultPerPage.toString();

    const prevPages = isFirst ? [] :
        Array.from({length: Math.min(MAX_PREV_PAGES, parseInt(page) - 1)}, (_, i) => parseInt(page) - i - 1).reverse();
    const nextPages = isLast ? [] :
        Array.from({length: Math.min(MAX_NEXT_PAGES, totalPages! - parseInt(page))}, (_, i) => parseInt(page) + i + 1);

    const displayEllipsisAtStart = prevPages.length > 0 && prevPages[0] > 1;
    const displayEllipsisAtEnd = nextPages.length > 0 && nextPages[nextPages.length - 1] < totalPages!;

    return (
        <Pagination>
            <PaginationContent>
                {!isFirst &&
                    <PaginationItem>
                        <PaginationPrevious onClick={
                            () => router.push(`?page=${parseInt(page) - 1}&per_page=${per_page}`)
                        }/>
                    </PaginationItem>
                }
                {displayEllipsisAtStart &&
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                }
                {prevPages.map((prevPage) => (
                    <PaginationItem key={prevPage}>
                        <PaginationLink onClick={
                            () => router.push(`?page=${prevPage}&per_page=${per_page}`)
                        }>
                            {prevPage}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        {page}
                    </PaginationLink>
                </PaginationItem>
                {nextPages.map((nextPage) => (
                    <PaginationItem key={nextPage}>
                        <PaginationLink onClick={
                            () => router.push(`?page=${nextPage}&per_page=${per_page}`)
                        }>
                            {nextPage}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {displayEllipsisAtEnd &&
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                }
                {!isLast &&
                    <PaginationItem>
                        <PaginationNext onClick={
                            () => router.push(`?page=${parseInt(page) + 1}&per_page=${per_page}`)
                        }/>
                    </PaginationItem>
                }
            </PaginationContent>
        </Pagination>
    );
};