import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {HomeNavBar} from '@/components/shared';
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patel Hall of Residence",
  description: "Official website of Patel Hall of Residence, IIT Kharagpur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HomeNavBar />

        <main className="flex flex-row">
          <section className="main-container">
            <div className="w-full">
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
