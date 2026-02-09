import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req: NextRequest) {
// aquí validas sesión + permisos por ruta
return NextResponse.next();
}