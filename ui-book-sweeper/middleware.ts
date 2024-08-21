import {NextRequest, NextResponse} from 'next/server'
import {jwtDecode} from "jwt-decode";
import {cookies} from 'next/headers'

const publicRoutes = ['/login', '/register', '/']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicRoute = publicRoutes.includes(path)

    const isAuthenticated = cookies().get('access_token');

    if(!isAuthenticated && !isPublicRoute) {
        const absoluteUrl = new URL("/login", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}