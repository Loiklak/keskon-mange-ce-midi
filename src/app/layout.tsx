import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keskon mange",
  description: "Mais on mange quoi ce midi putain ?",
};

const RESTAURANTS_SHEET_ID = process.env.RESTAURANTS_SHEET_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`h-full bg-slate-100 overflow-auto ${raleway.className}`}
      >
        <div className="h-full p-2">
          {children}
          <nav>
            <ul className="flex gap-4 justify-center">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link
                  href={`https://docs.google.com/spreadsheets/d/${RESTAURANTS_SHEET_ID}/edit#gid=0`}
                  target="_blank"
                >
                  Sheets restaus
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
