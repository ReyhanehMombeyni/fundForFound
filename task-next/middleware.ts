// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value;

//   // اگر توکنی وجود نداره، ریدایرکت کن به لاگین
//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // چک اعتبار توکن از طریق Strapi
//   const response = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   // اگه توکن نامعتبر بود، به لاگین برگرد
//   if (!response.ok) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // اجازه عبور
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/profile/:path*'],
// };
