import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CartModal from "@/components/CartModal";
import ImageListBackDrop from "@/components/ImageListBackDrop";
import ProgressBar from "@/components/ProgressBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="text-gray-800 bg-slate-50 h-screen">
        <ProgressBar />
        <Header />
        {children}
        <Footer />
        <CartModal />
        <ImageListBackDrop />
      </body>
    </html>

  );
}
