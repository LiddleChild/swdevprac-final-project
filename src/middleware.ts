import { withAuth } from "next-auth/middleware";

const adminPaths = ["/booking/manage"];

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token, req }) => {
      console.log(token);

      if (adminPaths.includes(req.nextUrl.pathname)) {
        return token?.role === "admin";
      }

      return !!token;
    },
  },
});

export const config = {
  matcher: ["/mybooking", "/booking/:path*"],
};
