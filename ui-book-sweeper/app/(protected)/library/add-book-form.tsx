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
import { Checkbox } from "@/components/ui/checkbox"
import {UploadIcon} from "lucide-react";
import {useSaveBook} from "@/hooks/use-save-book";



const addBookSchema = z.object({
    title: z.string(),
    authorName: z.string(),
    isbn: z.string(),
    synopsis: z.string(),
    shareable: z.boolean()
})

export const AddBookForm = () => {
    const { mutate } = useSaveBook();

    const form = useForm<z.infer<typeof addBookSchema>>({
        resolver: zodResolver(addBookSchema),
        defaultValues: {
            shareable: false
        }
    })

    function onSubmit(values: z.infer<typeof addBookSchema>) {
        mutate({
            bookRequest: values
        }, {
            onSuccess: () => {
                alert("Book uploaded successfully")
            }
        })
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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
                                        By enabling this option, other users can borrow this book from your collection.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button className="flex gap-2" size="lg" type="submit">Upload<UploadIcon size={18} /></Button>
                </form>
            </Form>
        </div>
    )
}