import { NextResponse, type NextRequest } from "next/server"

const protectedPrefixes = ["/dashboard", "/game", "/lobby"]

export async function proxy(request: NextRequest) {
  const isProtectedPath = protectedPrefixes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  )

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"
  const url = request.nextUrl.clone()

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
  matcher: ["/dashboard/:path*", "/rooms/:path*", "/game/:path*"],
}
