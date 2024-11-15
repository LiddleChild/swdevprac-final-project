import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { getServerSession } from "next-auth";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReduxProvider from "@/redux/ReduxProvider";

const notoSansThai = Noto_Sans_Thai({ subsets: [] });

export const metadata: Metadata = {
  title: "Vaccine Booking",
  description: "Vaccine booking app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className={`${notoSansThai.className} flex flex-col w-full h-screen`}>
        <ReduxProvider>
          <NextAuthProvider session={nextAuthSession}>
            <TopMenu />
            <div className="size-full flex flex-col">{children}</div>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}