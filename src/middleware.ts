import { NextRequest,NextResponse } from "next/server";

export function middleware(request:NextRequest){
    const path=request.nextUrl.pathname

    const ispublipath=path=="/login" || path=="/singup"

    const token=request.cookies.get('token')?.value || ""

   
    if(!ispublipath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl))
    }
}

export const config={
    matcher:[
        '/',
        '/profile',
        '/login',
        '/singup'
    ]
}