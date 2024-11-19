import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { Toaster } from "react-hot-toast";
import { getSession } from "@/libs/auth/nextAuthConfig";

const notoSansThai = Noto_Sans_Thai({ subsets: [] });

export const metadata: Metadata = {
  title: "Dentist Booking",
  description: "Dentist booking app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getSession();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className={`${notoSansThai.className} flex flex-col w-full h-screen`}>
        <NextAuthProvider session={nextAuthSession}>
          <div className="flex flex-row">
            <Toaster position="top-center" />
            <TopMenu />
            <div className="size-full ml-24 h-screen">{children}</div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
