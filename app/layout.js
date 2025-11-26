import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import ChatBot from "./components/helper/chat-bot";
import Navbar from "./components/navbar";
import AnalyticsProvider from "./components/analytics-provider";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata = {
  title: "Hassan Bin Waqar - Software Engineer & Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building innovative digital products with clean code and user-centric design.",
  keywords: "Hassan Bin Waqar, Software Engineer, Full Stack Developer, React Developer, Next.js, Web Developer, Portfolio",
  authors: [{ name: "Hassan Bin Waqar" }],
  creator: "Hassan Bin Waqar",
  publisher: "Hassan Bin Waqar",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hassanbinwaqar.codes",
    title: "Hassan Bin Waqar - Software Engineer & Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    siteName: "Hassan Bin Waqar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hassan Bin Waqar - Software Engineer",
    description: "Full Stack Developer specializing in modern web technologies",
  },
  icons: {
    icon: '/favicon-32.png',
    shortcut: '/favicon-32.png',
    apple: '/favicon-32.png',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0d1224',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsProvider />
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
          <ChatBot />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
