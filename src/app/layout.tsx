import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const BASE_URL = "https://salamkareemk.vercel.app";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Abdul Salam Kareem | AI Engineer & Web Developer",
    template: "%s | Abdul Salam Kareem",
  },
  description:
    "Futuristic personal portfolio of Abdul Salam Kareem — AI Engineer & Full-Stack Developer specialising in Machine Learning, NLP, Computer Vision, Django, and React.",
  keywords: [
    "Abdul Salam Kareem",
    "AI Engineer",
    "Machine Learning",
    "Full Stack Developer",
    "Django",
    "React",
    "Next.js",
    "NLP",
    "Computer Vision",
    "Portfolio",
  ],
  authors: [{ name: "Abdul Salam Kareem" }],
  creator: "Abdul Salam Kareem",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Abdul Salam Kareem",
    title: "Abdul Salam Kareem | AI Engineer & Web Developer",
    description:
      "Futuristic personal portfolio showcasing expertise in AI, Machine Learning, and Full-Stack Web Development.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Abdul Salam Kareem – AI Engineer & Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Salam Kareem | AI Engineer & Web Developer",
    description:
      "Futuristic personal portfolio showcasing expertise in AI, Machine Learning, and Full-Stack Web Development.",
    images: ["/profile.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-black text-white overflow-x-hidden`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
