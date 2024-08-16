import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navigation} from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dim">
      <body className={inter.className}>
      <Navigation />
      <main className="max-w-7xl mx-auto">{children}</main>
      <ToastContainer />
      </body>
    </html>
  );
}
