import { nextAuthConfig } from "@/libs/auth/nextAuthConfig";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };
