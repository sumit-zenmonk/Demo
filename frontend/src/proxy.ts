import { NextRequest, NextResponse } from "next/server";
import { StudentRoleNum } from "./enums/university.dept.enum";

const publicRoutes = ['/public', '/login', '/signup', '/student/login'];
const authenticatedUserBlockRoutes = ['/login', '/signup', '/student/login'];

export default function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;
    const { pathname } = req.nextUrl;
    const isAuthenticated = Boolean(token);

    const isPublic = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`) || pathname.endsWith('.svg'));
    const isAuthUserBlock = authenticatedUserBlockRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

    if (isAuthenticated && isAuthUserBlock) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (isPublic) {
        return NextResponse.next();
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/signup", req.url));
    }

    if (pathname.startsWith("/university") && role == StudentRoleNum.STUDENT) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith("/student") && role !== StudentRoleNum.STUDENT) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api|.*\\..*).*)'],
};