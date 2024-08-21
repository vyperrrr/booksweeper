import {NextRequest, NextResponse} from 'next/server'
import {jwtDecode} from "jwt-decode";
import {cookies} from 'next/headers'

const authRoutes = ['/login', '/register', '/activate-account']
const publicRoutes = [ '/', ...authRoutes]

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)

    const isAuthenticated = cookies().get('access_token');

    console.log(isAuthenticated)

    if (!isAuthenticated && !isPublicRoute) {
        const absoluteUrl = new URL("/login", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }

    if (isAuthenticated && authRoutes.includes(path)) {
        const absoluteUrl = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}