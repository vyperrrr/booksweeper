"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {UploadIcon} from "lucide-react";
import {useSaveBook} from "@/hooks/use-save-book";
import React, {useState} from "react";
import {useUploadBookCover} from "@/hooks/use-upload-book-cover";
import {Card} from "@/components/ui/card";
import {revalidatePath} from "next/cache";
import {useRouter} from "next/navigation";

const addBookSchema = z.object({
    title: z.string(),
    authorName: z.string(),
    isbn: z.string(),
    synopsis: z.string(),
    shareable: z.boolean(),
    file: z.instanceof(FileList).optional(),
})

export const AddBookForm = () => {
    const router = useRouter();

    const {mutate: saveBook} = useSaveBook();
    const {mutate: uploadBookCover} = useUploadBookCover();
    const [file, setFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof addBookSchema>>({
        resolver: zodResolver(addBookSchema),
        defaultValues: {
            shareable: false
        }
    })

    const fileRef = form.register("file");

    fileRef.onChange = async (e: { target: any; type?: any; }) => {
        setFile(e.target.files[0]);
    };

    function onSubmit(values: z.infer<typeof addBookSchema>) {
        const {file, ...rest} = values;

        handleSaveBook(rest);
    }

    const handleSaveBook = (bookData: Omit<z.infer<typeof addBookSchema>, "file">) => {
        saveBook({
            bookRequest: bookData,
        }, {
            onSuccess: (response) => {
                const uploadedBookId = response.data;

                if (!file) {
                    return;
                }

                handleUploadBookCover(uploadedBookId, file);
            }
        })
    }

    const handleUploadBookCover = (bookId: number, file: File) => {
        uploadBookCover({
            bookId,
            file,
        }, {
            onSuccess: () => {
                // TODO: toast
                router.refresh();
                alert("Book uploaded successfully");
            }
        })
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-12 gap-12">
                        <div className="col-span-3 space-y-4">
                            <Card className="relative h-[400px]">
                                <div className="relative block overflow-hidden rounded-lg group">
                                    {file && <img
                                        src={URL.createObjectURL(file)}
                                        width={300}
                                        height={400}
                                        alt="Book Cover"
                                        className="h-[400px] w-full object-cover transition-all duration-300 group-hover:scale-105"
                                        style={{aspectRatio: "300/400", objectFit: "cover"}}
                                    />}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
                                </div>
                            </Card>
                            <FormField
                                control={form.control}
                                name="file"
                                render={({field}) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Upload a book cover</FormLabel>
                                            <FormControl>
                                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                                    <Input {...fileRef} id="picture" type="file"/>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <div className="col-span-9 space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="The title of the book"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                    control={form.control}
                                    name="authorName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Author</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="The author of the book"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isbn"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>ISBN</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="International standard book number"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="synopsis"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Synopsis</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Say something about this book"
                                                className="resize-none h-48"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shareable"
                                render={({field}) => (
                                    <FormItem
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Make this book available to public
                                            </FormLabel>
                                            <FormDescription>
                                                By enabling this option, other users can borrow this book from your
                                                collection.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <Button className="flex gap-2" size="lg" type="submit">Upload<UploadIcon
                                size={18}/></Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}