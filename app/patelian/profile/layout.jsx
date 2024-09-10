import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AuthRoute } from "@/components";
import { roles } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Patel Hall of Residence",
    description: "Official website of Patel Hall of Residence, IIT Kharagpur",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthRoute roles={roles}>{children}</AuthRoute>
            </body>
        </html>
    );
}
