import type { Metadata } from "next";
import { Anton, Space_Grotesk, Inter } from "next/font/google";
import localFont from "next/font/local";
import LenisProvider from "@/components/LenisProvider";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const helveticaNow = localFont({
  src: "../../public/fonts/HelveticaNowDisplayBold.woff2",
  variable: "--font-helvetica-now",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASHER | KINETIC PORTFOLIO",
  description:
    "Designer & Creative Strategist — Building digital structures that command attention through stillness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceGrotesk.variable} ${inter.variable} ${helveticaNow.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="font-body min-h-screen" suppressHydrationWarning>
        <LenisProvider>
          <LoadingScreen />
          <ScrollProgress />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
