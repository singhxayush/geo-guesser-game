import { NextResponse } from "next/server"
import { SignJWT } from "jose"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET)
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret)

    const response = NextResponse.json({ success: true })
    
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
