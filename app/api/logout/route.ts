import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    await request.cookies?.clear()
    return NextResponse.redirect(request.url.replace("/api/logout","/login"))
}