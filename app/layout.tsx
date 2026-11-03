import type { Metadata, Viewport } from "next";
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
    apple: './images/icon-180x180.png',
    shortcut: './images/favicon.ico',
  },
  // iOS PWA: when launched from the Home Screen icon, run standalone
  // (no browser chrome) with the app title in the status bar.
  appleWebApp: {
    capable: true,
    title: 'SmartScore',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Use the full screen including the notch / Dynamic Island area; the
  // safe-area insets are handled in globals.css.
  viewportFit: 'cover',
  // iOS Safari zooms into focused inputs; keep iOS from pinch-zooming
  // while a standalone PWA is open.
  maximumScale: 1,
  userScalable: false,
  themeColor: '#141720',
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
