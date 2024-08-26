"use client";

import * as React from 'react';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ArchiveIcon, ArchiveRestoreIcon, GlobeIcon, GlobeLockIcon, StarIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useOwnedBooks} from "@/hooks/use-owned-books";
import {useBookStatus} from "@/hooks/use-book-status";

export const OwnedBookControls = () => {

    const { data: myBooks} = useOwnedBooks();
    const { handleChangeStatus } = useBookStatus();

    return (
        <div>
            <Table>
                <TableCaption>A list of all your books, owned and borrowed.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Archived</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {myBooks?.data.content?.map((book) => (
                        <TableRow key={book.id}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.authorName}</TableCell>
                            <TableCell>{book.isbn}</TableCell>
                            <TableCell>
                                {book.rate === 0 ? "None" :
                                    <span className="flex gap-2 items-center">
                                        {book.rate}
                                        <StarIcon className="h-4 w-4 fill-primary"/>
                                    </span>
                                }
                            </TableCell>
                            <TableCell>{book.shareable ?
                                <Button onClick={() => handleChangeStatus(book.id!)} className="flex gap-2"><GlobeIcon size={16}/>Public</Button> :
                                <Button variant="outline" className="flex gap-2"><GlobeLockIcon
                                    size={16}/>Private</Button>}
                            </TableCell>
                            <TableCell>{book.archived ?
                                <Button variant="outline" className="flex gap-2"><ArchiveRestoreIcon size={16}/>Restore</Button> :
                                <Button className="flex gap-2"><ArchiveIcon
                                    size={16}/>Archive</Button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};