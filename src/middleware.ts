import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
 
export function middleware(request: NextRequest) {
	const nextUrl = request.nextUrl;
	if (!request.cookies.get('token')) {
		return NextResponse.redirect(new URL('/beta/login', request.url));
	}
	
}

export const config = {
  matcher: ['/problems/:path*','/submissions/:path*','/rankings/:path*','/about/:path*'],
};
