import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "microgpt",
  description:
    "A complete GPT built from scratch with zero runtime dependencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex h-screen flex-col overflow-hidden antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
