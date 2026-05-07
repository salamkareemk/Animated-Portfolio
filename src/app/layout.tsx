import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abdul Salam Kareem | AI Engineer & Web Developer",
  description: "Futuristic personal portfolio of Abdul Salam Kareem, showcasing expertise in Artificial Intelligence, Machine Learning, and Web Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} antialiased bg-black text-white overflow-x-hidden`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
