import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
    title: "Patel Hall of Residence",
    description: "Official website of Patel Hall of Residence, IIT Kharagpur",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
