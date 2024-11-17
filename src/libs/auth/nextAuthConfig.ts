import { getServerSession, NextAuthOptions } from "next-auth";
import userLogIn from "@/libs/userLogIn";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) throw new Error("Credentials cannot be empty");

        try {
          const result = await userLogIn(credentials.email, credentials.password);
          if (result.success) {
            return {
              _id: result._id,
              name: result.name,
              email: result.email,
              role: result.role,
              token: result.token,
            } as any;
          } else {
            throw new Error(result.msg);
          }
        } catch (err) {
          throw err;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      return { ...session, user: token };
    },
  },
};

export async function getSession() {
  return getServerSession(nextAuthConfig);
}
