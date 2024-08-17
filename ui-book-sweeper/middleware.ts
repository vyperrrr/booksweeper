import useAuthStore from "@/store/use-auth-store";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/"];
export default function middleware(req: NextRequest) {
    const isUserAuthenticated = useAuthStore(state => state.isLoggedIn);
    if (
        !isUserAuthenticated &&
        protectedRoutes.includes(req?.nextUrl?.pathname)
    ) {
        const absoluteUrl = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }
    return NextResponse.next();
}