import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CartModal from "@/components/CartModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="text-gray-800 bg-slate-50 h-screen">
        <Header />
        {children}
        <Footer />
        <CartModal />
      </body>
    </html>

  );
}
