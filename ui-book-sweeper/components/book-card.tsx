import {Card} from "@/components/ui/card";
import {StarIcon} from "lucide-react";
import Link from "next/link";

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
                    style={{ aspectRatio: "300/400", objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                    <h3 className="text-lg font-bold text-white">The Great Gatsby</h3>
                    <div className="flex items-center gap-2 text-sm text-white">
                        <StarIcon className="h-4 w-4 fill-primary" />
                        <span>4.8</span>
                        <span className="text-muted-foreground">(123 reviews)</span>
                    </div>
                </div>
            </Link>
        </Card>
    );
};