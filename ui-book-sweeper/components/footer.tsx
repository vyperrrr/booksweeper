import Link from "next/link";
import {FacebookIcon, InstagramIcon, PaintbrushIcon, TwitterIcon, YoutubeIcon} from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-muted py-12 text-muted-foreground">
            <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:gap-12 lg:max-w-7xl">
                <div className="flex flex-col items-start gap-4">
                    <Link href="#" className="flex items-center gap-2" prefetch={false}>
                        <PaintbrushIcon className="h-8 w-8"/>
                        <span className="text-2xl font-bold">Booksweeper</span>
                    </Link>
                    <p className="max-w-md text-sm">
                        Welcome to our vibrant book sharing community! Connect with fellow book lovers,
                        discover new reads, and share your literary adventures.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="grid gap-2">
                        <h4 className="text-sm font-medium">Quick Links</h4>
                        <Link href="#" className="text-sm hover:underline" prefetch={false}>
                            Home
                        </Link>
                        <Link href="#" className="text-sm hover:underline" prefetch={false}>
                            About
                        </Link>
                        <Link href="#" className="text-sm hover:underline" prefetch={false}>
                            Contact
                        </Link>
                    </div>
                    <div className="grid gap-2">
                        <h4 className="text-sm font-medium">Community</h4>
                        <Link href="#" className="text-sm hover:underline" prefetch={false}>
                            Forums
                        </Link>
                        <Link href="#" className="text-sm hover:underline" prefetch={false}>
                            Book Clubs
                        </Link>
                        <Link href="#" className="text-sm hover:underline" prefetch={false}>
                            Events
                        </Link>
                    </div>
                    <div className="grid gap-2">
                        <h4 className="text-sm font-medium">Support</h4>
                        <Link href="#" className="text-sm hover:underline" prefetch={false}>
                            FAQ
                        </Link>
                        <Link href="#" className="text-sm hover:underline" prefetch={false}>
                            Help Center
                        </Link>
                        <Link href="#" className="text-sm hover:underline" prefetch={false}>
                            Feedback
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-4">
                    <h4 className="text-sm font-medium">Follow Us</h4>
                    <div className="flex items-center gap-4">
                        <Link
                            href="#"
                            aria-label="Facebook"
                            className="text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            <FacebookIcon className="h-6 w-6"/>
                        </Link>
                        <Link
                            href="#"
                            aria-label="Twitter"
                            className="text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            <TwitterIcon className="h-6 w-6"/>
                        </Link>
                        <Link
                            href="#"
                            aria-label="Instagram"
                            className="text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            <InstagramIcon className="h-6 w-6"/>
                        </Link>
                        <Link
                            href="#"
                            aria-label="YouTube"
                            className="text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            <YoutubeIcon className="h-6 w-6"/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t pt-6 text-center text-xs">
                <p>&copy; 2024 Booksweeper. All rights reserved.</p>
            </div>
        </footer>
    );
};