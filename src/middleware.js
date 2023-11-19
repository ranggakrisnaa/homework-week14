import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from 'next/server';


export async function middleware(req) {
    const auth = req.headers.get("authorization");
    const token = auth && auth.split(" ")[1];

    if (!token) {
        return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        return NextResponse.redirect(new URL('/api/books', request.url));
    } catch (error) {
        console.error(error);
    }

}

export const config = {
    matcher: ['/api/books/:path*']
};