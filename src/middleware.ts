import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas que NO requieren autenticación
const PUBLIC_ROUTES = ["/login", "/forgot-password"];

// Rutas que requieren autenticación
const PROTECTED_ROUTES = ["/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth_token")?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Si está autenticado e intenta entrar a login, lo mandamos al dashboard
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Si NO está autenticado e intenta entrar a una ruta protegida, lo mandamos al login
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/login", req.url);
    // Guardamos a dónde quería ir para redirigirlo después del login
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Le decimos a Next.js en qué rutas corre el middleware
// Excluimos archivos estáticos, imágenes, etc.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};