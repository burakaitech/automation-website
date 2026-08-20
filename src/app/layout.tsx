import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Burak AI - Automation Control Center",
  description: "Modern minimalist Next.js dashboard for triggering and monitoring n8n automations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={${inter.className} antialiased selection:bg-blue-600 selection:text-white}>
        {children}
      </body>
    </html>
  );
}
