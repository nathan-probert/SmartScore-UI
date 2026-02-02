import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "../components/Header";
import { ThemeProvider } from "../components/theme-provider";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Nathan Probert',
    default: 'Nathan Probert',
  },
  description: "Nathan Probert's portfolio website",
  applicationName: "Nathan Probert",
  icons: {
    icon: './images/favicon.ico',
    apple: './images/favicon.ico',
    shortcut: './images/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-full sm:w-full md:max-w-[70%] lg:max-w-7xl mx-auto px-4" id="top">
              <Header />
              {children}
            </div>
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
