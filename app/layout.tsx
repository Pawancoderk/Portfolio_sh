import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/UI/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pawan Kumar | Full Stack Developer & AI Builder",
  description: "Portfolio of Pawan Kumar. Specialized in building production-ready full stack web platforms and integrating smart AI pipelines using Next.js, TypeScript, PostgreSQL, and Google Gemini.",
  applicationName: "Pawan Kumar Portfolio",
  authors: [{ name: "Pawan Kumar" }],
  keywords: [
    "Pawan Kumar",
    "Full Stack Developer",
    "AI Builder",
    "Next.js Developer",
    "TypeScript Portfolio",
    "Software Engineer",
    "Gemini API",
    "Prisma PostgreSQL",
    "Bento Canvas Portfolio"
  ],
  openGraph: {
    title: "Pawan Kumar | Full Stack Developer & AI Builder",
    description: "Although early in my career, I build production-ready full stack and AI-powered products.",
    url: "https://pawan-kumar.tech",
    siteName: "Pawan Kumar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawan Kumar | Full Stack Developer & AI Builder",
    description: "Although early in my career, I build production-ready full stack and AI-powered products.",
    creator: "@pawan_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
