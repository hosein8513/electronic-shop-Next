import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({
        message:'Logeedout successfully'
    })
    response.cookies.delete('session')

    return response
}