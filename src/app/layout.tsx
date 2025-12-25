import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ornn | Forge Your Next Startup",
  description:
    "Launch with one click. Ornn is a high-performance Next.js starter kit designed for indie hackers and developers who want to forge scalable SaaS products fast",
  keywords: [
    "nextjs",
    "react",
    "starter-kit",
    "boilerplate",
    "saas",
    "typescript",
    "shadcn-ui",
    "ai",
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${instrumentSans.variable} antialiased`}>
        <Toaster className="pointer-events-auto" closeButton />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
