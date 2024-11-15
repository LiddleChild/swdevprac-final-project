"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type NextAuthProviderProps = {
  children: React.ReactNode;
  session: Session | null;
};

export default function NextAuthProvider({ children, session }: NextAuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
