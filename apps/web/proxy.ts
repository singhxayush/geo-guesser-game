import { NextResponse, type NextRequest } from "next/server"
import { jwtVerify } from "jose"

const protectedPrefixes = ["/dashboard", "/game", "/lobby"]

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Handle Admin Auth
  if (url.pathname.startsWith("/admin") && !url.pathname.startsWith("/admin/login")) {
    const adminToken = request.cookies.get("admin_token")?.value

    if (!adminToken) {
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }

    try {
      const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET)
      await jwtVerify(adminToken, secret)
      return NextResponse.next()
    } catch (err) {
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }
  }

  // Handle Game/Lobby/Dashboard Auth
  const isProtectedPath = protectedPrefixes.some((prefix) =>
    url.pathname.startsWith(prefix)
  )

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

  let sessionResponse: Response

  try {
    sessionResponse = await fetch(`${apiUrl}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    })
  } catch {
    url.pathname = "/"
    url.searchParams.set("auth", "unavailable")

    return NextResponse.redirect(url)
  }

  if (sessionResponse.ok) {
    const session = await sessionResponse.json()

    if (session) {
      return NextResponse.next()
    }
  }

  url.pathname = "/"

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/dashboard/:path*", "/rooms/:path*", "/game/:path*", "/lobby/:path*", "/admin/:path*"],
}
