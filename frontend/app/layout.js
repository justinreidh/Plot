import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { NavBar } from "../components/Navbar"
import Auth from "./auth/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Plot",
  description: "Build plot structure",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthProvider>
            <NavBar></NavBar>
            {children}
          </AuthProvider>
        </body>
      
    </html>
  );
}
