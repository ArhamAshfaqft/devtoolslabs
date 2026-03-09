import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | DevToolsLabs",
    default: "DevToolsLabs - 100% Free Client-Side Developer Utilities"
  },
  description: "A free, offline, privacy-first collection of web developer tools. Format JSON, convert UNIX timestamps, decode Base64, and minify CSS entirely inside your browser.",
  generator: "Next.js",
  applicationName: "DevToolsLabs",
  keywords: ["developer tools", "JSON formatter", "JWT decoder", "Base64 encoder", "HTML minifier", "client-side tools", "free online tools"],
  authors: [{ name: "ArhamAshfaqft" }],
  creator: "ArhamAshfaqft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased text-gray-900 bg-white flex flex-col min-h-screen`}>
        <Header />
        <div className="flex-1 w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
