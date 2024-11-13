import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PATH } from "./shared/path";
import { ENV } from "./configs/environment";

const TOKEN_KEY = ENV.TOKEN_KEY;
const JWT_SECRET = ENV.JWT_SCREET;

export async function middleware(request: NextRequest) {
	const token = request.cookies.get(TOKEN_KEY);
    console.log({token});
    
	// Cek apakah user sudah berada di halaman "not found" untuk menghindari redirect loop
	if (request.nextUrl.pathname === PATH.NOT_FOUND) {
		return NextResponse.next();
	}

	// Jika token tidak ada, tampilkan halaman "not found" tanpa redirect loop
	if (!token) {
		return NextResponse.rewrite(new URL(PATH.NOT_FOUND, request.url));
	}

	try {
		// Verifikasi token JWT
		const secret = new TextEncoder().encode(JWT_SECRET);
		const { payload } = await jwtVerify(token.value, secret, {
			algorithms: ["HS256"],
		});

		// Cek apakah token sudah kedaluwarsa
		const currentTime = Math.floor(Date.now() / 1000);
		if (payload.exp && payload.exp < currentTime) {
			request.cookies.delete(TOKEN_KEY);
			return NextResponse.rewrite(new URL(PATH.NOT_FOUND, request.url));
		}

		// Jika token valid, lanjutkan ke halaman tujuan
		return NextResponse.next();
	} catch {
		// Hapus token jika verifikasi gagal dan tampilkan halaman "not found"
		request.cookies.delete(TOKEN_KEY);
		return NextResponse.rewrite(new URL(PATH.NOT_FOUND, request.url));
	}
}

export const config = {
    matcher: '/api/:path*',
};
