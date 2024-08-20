import {Card} from "@/components/ui/card";
import {StarIcon} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const BookCard = () => {
    return (
        <Card className="group">
            <Link href="#" className="relative block overflow-hidden rounded-lg" prefetch={false}>
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
                    <h3 className="text-lg font-bold text-white">The Great Gatsby</h3>
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
                            <h3 className="text-lg font-bold text-white">The Great Gatsby</h3>
                            <p className="text-xs">by F. Scott Fitzgerald</p>
                        </div>
                        <div className="text-muted-foreground text-xs">
                            <span>ISBN: 92233597</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                            <StarIcon className="h-4 w-4 fill-primary"/>
                            <span>4.8</span>
                            <span className="text-muted-foreground">(123 reviews)</span>
                        </div>
                    </div>
                    <div className="text-muted-foreground text-sm text-pretty indent-8 text-justify">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam finibus, nisl sit amet pulvinar
                        pellentesque, orci turpis auctor dui, eget consectetur erat quam at magna. Nam tempus imperdiet
                        sagittis. Nullam semper consequat malesuada. Integer bibendum condimentum lobortis. Quisque in
                        elementum augue. Nulla suscipit lectus at turpis luctus, volutpat rutrum quam aliquet. Maecenas
                        aliquam ipsum ac convallis ultrices. Proin id velit ac purus convallis malesuada sed id quam.
                        Quisque facilisis mi libero, at condimentum lacus aliquam vitae. Pellentesque tortor ipsum,
                        congue vel maximus nec, volutpat laoreet dui. Mauris in mauris ut felis tristique suscipit
                        vehicula eu neque.
                    </div>
                </div>
                <div
                    className="absolute bottom-0 left-0 right-0 hidden group-hover:block bg-secondary/40 backdrop-blur py-4 px-4">
                    <Button size="lg" className="w-full text-mute font-bold">Borrow book</Button>
                </div>
            </Link>
        </Card>
    );
};