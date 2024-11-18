import { withAuth } from "next-auth/middleware";

const adminPaths = ["/booking/manage"];

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token, req }) => {
      if (adminPaths.includes(req.nextUrl.pathname) && token?.role !== "admin") {
        return false;
      }

      return !!token;
    },
  },
});

export const config = {
  matcher: ["/mybooking", "/booking/:path*"],
};
