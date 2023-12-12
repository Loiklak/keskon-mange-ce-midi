import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keskon mange",
  description: "Mais on mange quoi ce midi putain ?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full ${raleway.className}`}>
        <div className="h-full bg-slate-100 overflow-auto p-2">
          {children}
          <nav>
            <ul className="flex gap-4 justify-center">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/restaurant-list">Liste restaus</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
