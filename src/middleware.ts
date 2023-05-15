import { withAuth } from 'next-auth/middleware';

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
    pages: {
        signIn: '/signin',
    },
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - Signin page
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!signin|_next/static|_next/image|favicon.ico).*)',
    ],
};
